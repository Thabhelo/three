import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const envFiles = [".env.local", ".env.example"];
const outDir = path.join(root, "public", "media");

const requests = [
  { file: "guestbook-journal.jpg", query: "open journal desk", orientation: "landscape" },
  { file: "blog-mdx-writing.jpg", query: "writing desk notebook", orientation: "landscape" },
  { file: "blog-learning-code.jpg", query: "laptop learning code", orientation: "landscape" },
  { file: "project-mesh-public-safety.jpg", query: "police emergency lights city night", orientation: "landscape" },
  { file: "project-genesis.jpg", query: "software developers collaborating laptops", orientation: "landscape" },
  { file: "project-cowcow-field.jpg", query: "rural road field data collection driving", orientation: "landscape" },
  { file: "project-dufind-traffic.jpg", query: "highway traffic aerial cars", orientation: "landscape" },
  { file: "project-pytorch-dlrs.jpg", query: "python code laptop programming", orientation: "landscape" },
  { file: "project-medical-imaging.jpg", query: "doctor medical scan radiology monitor", orientation: "landscape" },
  { file: "project-fineprint-contract.jpg", query: "signing legal contract documents", orientation: "landscape" },
];

async function readEnvValue(name) {
  if (process.env[name]) return process.env[name];

  for (const file of envFiles) {
    try {
      const text = await fs.readFile(path.join(root, file), "utf8");
      const line = text.split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`));
      if (line) return line.slice(name.length + 1).trim();
    } catch {
      // Try the next env source.
    }
  }

  return "";
}

async function fetchPhoto({ query, orientation }) {
  const key = await readEnvValue("PEXELS_API_KEY");
  if (!key) {
    throw new Error("PEXELS_API_KEY is missing.");
  }

  const url = new URL("https://api.pexels.com/v1/search");
  url.searchParams.set("query", query);
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("per_page", "1");

  const response = await fetch(url, {
    headers: { Authorization: key },
  });

  if (!response.ok) {
    throw new Error(`Pexels request failed for "${query}" with ${response.status}.`);
  }

  const payload = await response.json();
  const photo = payload.photos?.[0];
  if (!photo) {
    throw new Error(`No Pexels result for "${query}".`);
  }

  return {
    id: photo.id,
    alt: photo.alt || query,
    photographer: photo.photographer,
    photographerUrl: photo.photographer_url,
    pexelsUrl: photo.url,
    downloadUrl: photo.src?.large2x || photo.src?.large || photo.src?.original,
  };
}

await fs.mkdir(outDir, { recursive: true });

const manifest = [];

for (const request of requests) {
  try {
    const photo = await fetchPhoto(request);
    const response = await fetch(photo.downloadUrl);
    if (!response.ok) throw new Error(`Image download failed with ${response.status}.`);

    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(path.join(outDir, request.file), buffer);

    manifest.push({
      file: `/media/${request.file}`,
      query: request.query,
      alt: photo.alt,
      photographer: photo.photographer,
      photographerUrl: photo.photographerUrl,
      pexelsUrl: photo.pexelsUrl,
    });

    console.log(`saved ${request.file}`);
  } catch (error) {
    console.warn(`skipped ${request.file}: ${error.message}`);
  }
}

await fs.writeFile(path.join(outDir, "pexels-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
