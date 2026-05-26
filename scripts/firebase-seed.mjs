import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import admin from "firebase-admin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const keyPath = resolve(root, ".firebase-seed-key.json");
const envPath = resolve(root, ".env");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

if (!existsSync(keyPath)) {
  console.error("Missing .firebase-seed-key.json. Run the service account setup first.");
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(keyPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "thabhelo-portfolio.firebasestorage.app",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

const evaluationContent = readFileSync(
  resolve(root, "src/content/blog/after-the-data-ramp.md"),
  "utf8",
);

const nativePosts = [
  {
    slug: "after-the-data-ramp",
    title: "Scaling Autonomous Vehicles: Miles, Data, and Coverage",
    date: "2026-05-26",
    excerpt:
      "Waymo and Tesla are scaling fleet miles faster than training data covers new geographies. What changes when scalability—not demos—becomes the AV strategy.",
    tags: ["Autonomous Vehicles", "Data", "DeepUbuntu", "Industry"],
    readTime: "14 min read",
    coverImage: "/media/blog-highway-aerial.jpg",
    content: evaluationContent,
  },
];

async function cleanupOldBlogs() {
  const canonicalSlugs = new Set(nativePosts.map((post) => post.slug));
  const [files] = await bucket.getFiles({ prefix: "blogs/" });

  for (const file of files) {
    const slug = file.name.replace(/^blogs\//, "").replace(/\.md$/, "");
    if (!slug || canonicalSlugs.has(slug)) continue;

    await file.delete();
    console.log(`✗ removed old blog: ${slug}`);
  }
}

async function seedNativePosts() {
  for (const post of nativePosts) {
    const file = bucket.file(`blogs/${post.slug}.md`);
    await file.save(post.content, {
      contentType: "text/markdown",
      metadata: {
        metadata: {
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          readTime: post.readTime,
          coverImage: post.coverImage,
          tags: JSON.stringify(post.tags),
          channel: "native",
        },
      },
    });
    console.log(`✓ native blog: ${post.slug}`);
  }
}

async function seedMediumPosts() {
  console.log("ℹ Medium posts are synced separately. Run: npm run medium:sync");
}

async function ensureAdminUser() {
  const email = process.env.BLOG_ADMIN_EMAIL ?? "thabhelo@deepubuntu.com";
  const password = process.env.BLOG_ADMIN_PASSWORD;

  if (!password) {
    console.log("⚠ Skipping admin user. Set BLOG_ADMIN_PASSWORD in .env");
    return;
  }

  try {
    await admin.auth().getUserByEmail(email);
    console.log(`✓ admin user exists: ${email}`);
  } catch (error) {
    const code = error?.errorInfo?.code ?? error?.code;
    if (code === "auth/configuration-not-found") {
      console.log("⚠ Firebase Auth not enabled yet.");
      console.log("  Enable Email/Password at:");
      console.log("  https://console.firebase.google.com/project/thabhelo-portfolio/authentication/providers");
      console.log(`  Then create admin user ${email} or re-run npm run firebase:seed`);
      return;
    }

    try {
      await admin.auth().createUser({ email, password, emailVerified: true });
      console.log(`✓ admin user created: ${email}`);
    } catch (createError) {
      console.log(`⚠ Could not create admin user: ${createError.message}`);
    }
  }
}

async function main() {
  console.log("Seeding thabhelo-portfolio...\n");
  await cleanupOldBlogs();
  await seedNativePosts();
  await seedMediumPosts();
  await ensureAdminUser();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
