import { chromium } from "playwright";
import { promises as fs } from "node:fs";
import path from "node:path";

const baseUrl = "https://aayushbharti.in";
const mirrorDir = "/Users/thabhelo/aayushbharti.in";
const outDir = path.resolve("reference-style-audit");
const routes = ["/", "/about", "/projects", "/blog", "/guestbook", "/uses"];

const styleProps = [
  "position",
  "display",
  "alignItems",
  "justifyContent",
  "gap",
  "width",
  "height",
  "maxWidth",
  "padding",
  "margin",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
  "color",
  "background",
  "backgroundColor",
  "backgroundImage",
  "border",
  "borderColor",
  "borderRadius",
  "boxShadow",
  "filter",
  "backdropFilter",
  "opacity",
  "transform",
  "transition",
  "animationName",
  "animationDuration",
  "animationTimingFunction",
  "animationIterationCount",
  "zIndex",
];

const selectors = {
  nav: "nav",
  logo: "nav a:first-child",
  navPill: "nav",
  homeLink: "text=Home",
  moreTrigger: "text=More",
  bookCall: "text=Book a Call",
  commandHint: "text=⌘",
  heroBadge: "text=Keythm",
  heroHeading: "h1",
  heroSubcopy: "h1 + *",
  heroCta: "text=Let's Connect",
  emailLink: "a[href^='mailto:']",
  bentoCards: "section div[class*='rounded']",
  projectCards: "article, a[href*='/projects/']",
  blogCards: "a[href*='/blog/']",
  footer: "footer",
};

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, extensions, output = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath, extensions, output);
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      output.push(fullPath);
    }
  }
  return output;
}

function uniq(values) {
  return [...new Set(values)].sort();
}

async function extractStaticClues() {
  const files = await walk(mirrorDir, [".html", ".js"]);
  const cluePattern =
    /[A-Za-z0-9_!:[\]()./%~'"-]*(?:animate|duration|ease|transition|backdrop|blur|shadow|rounded|border-white|neutral|zinc|font-|bg-|text-|radial|linear|gradient|mask|clip|sticky|fixed|hover|group-hover|translate|scale|opacity|inset|container|max-w|grid|col-span|row-span)[A-Za-z0-9_!:[\]()./%~'"-]*/g;
  const cssAssets = [];
  const nextAssets = [];
  const clues = [];

  for (const file of files) {
    const text = await fs.readFile(file, "utf8");
    cssAssets.push(...(text.match(/\/_next\/static\/[^"' )]+\.css/g) || []));
    nextAssets.push(...(text.match(/\/_next\/static\/[^"' )]+/g) || []));
    const matches = text.match(cluePattern) || [];
    for (const match of matches) {
      if (match.length > 2 && match.length < 180) {
        clues.push(match);
      }
    }
  }

  await fs.writeFile(
    path.join(outDir, "static-clues.json"),
    JSON.stringify(
      {
        cssAssets: uniq(cssAssets),
        nextAssets: uniq(nextAssets),
        classAndStyleClues: uniq(clues).slice(0, 5000),
      },
      null,
      2,
    ),
  );
}

async function snapshotLocator(locator, name, routeDir) {
  const count = Math.min(await locator.count(), 8);
  const items = [];

  for (let index = 0; index < count; index += 1) {
    const element = locator.nth(index);
    try {
      const data = await element.evaluate((node, props) => {
        const style = window.getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        const text = (node.innerText || node.textContent || "").trim();
        const styles = {};
        for (const prop of props) styles[prop] = style[prop];
        return {
          tag: node.tagName.toLowerCase(),
          id: node.id || null,
          className: typeof node.className === "string" ? node.className : String(node.className || ""),
          text: text.slice(0, 240),
          rect: {
            x: Math.round(rect.x),
            y: Math.round(rect.y),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            top: Math.round(rect.top),
            left: Math.round(rect.left),
          },
          styles,
          animations: node.getAnimations().map((animation) => ({
            playState: animation.playState,
            currentTime: animation.currentTime,
            timing: animation.effect?.getTiming?.() || null,
            keyframes: animation.effect?.getKeyframes?.() || [],
          })),
        };
      }, styleProps);
      items.push(data);
    } catch (error) {
      items.push({ error: String(error) });
    }
  }

  await fs.writeFile(path.join(routeDir, `${name}.json`), JSON.stringify(items, null, 2));
  return items;
}

async function captureRoute(page, route) {
  const safeName = route === "/" ? "home" : route.replaceAll("/", "");
  const routeDir = path.join(outDir, safeName);
  await fs.mkdir(routeDir, { recursive: true });

  const network = [];
  page.removeAllListeners("response");
  page.on("response", async (response) => {
    const url = response.url();
    const contentType = response.headers()["content-type"] || "";
    if (url.includes("/_next/static/") || contentType.includes("javascript") || contentType.includes("css")) {
      network.push({ url, status: response.status(), contentType });
    }
  });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(routeDir, "top.png"), fullPage: false });

  const computed = {};
  for (const [name, selector] of Object.entries(selectors)) {
    computed[name] = await snapshotLocator(page.locator(selector), name, routeDir);
  }

  const layout = await page.evaluate((props) => {
    const nodes = [...document.querySelectorAll("*")];
    return {
      title: document.title,
      url: location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      bodyHeight: document.body.scrollHeight,
      documentElementClasses: document.documentElement.className,
      bodyStyles: Object.fromEntries(props.map((prop) => [prop, window.getComputedStyle(document.body)[prop]])),
      visualElements: nodes
        .map((node) => {
          const style = window.getComputedStyle(node);
          const rect = node.getBoundingClientRect();
          const className = typeof node.className === "string" ? node.className : String(node.className || "");
          const text = (node.innerText || node.textContent || "").trim();
          const interesting =
            rect.width > 80 &&
            rect.height > 24 &&
            (style.backgroundImage !== "none" ||
              style.backdropFilter !== "none" ||
              style.boxShadow !== "none" ||
              style.transform !== "none" ||
              style.transitionDuration !== "0s" ||
              style.animationName !== "none" ||
              style.position === "fixed" ||
              style.position === "sticky" ||
              className.includes("rounded") ||
              className.includes("border"));
          if (!interesting) return null;
          return {
            tag: node.tagName.toLowerCase(),
            className,
            text: text.slice(0, 160),
            rect: {
              x: Math.round(rect.x),
              y: Math.round(rect.y),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
            styles: Object.fromEntries(props.map((prop) => [prop, style[prop]])),
          };
        })
        .filter(Boolean)
        .slice(0, 500),
    };
  }, styleProps);

  await fs.writeFile(path.join(routeDir, "layout.json"), JSON.stringify(layout, null, 2));

  const pageHeight = layout.bodyHeight;
  const viewportHeight = layout.viewport.height;
  const scrollPoints = [0, Math.floor(pageHeight * 0.25), Math.floor(pageHeight * 0.5), Math.floor(pageHeight * 0.75), pageHeight - viewportHeight].filter(
    (value, index, values) => value >= 0 && values.indexOf(value) === index,
  );

  for (let index = 0; index < scrollPoints.length; index += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollPoints[index]);
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(routeDir, `scroll-${index}.png`), fullPage: false });
    await snapshotLocator(page.locator("nav"), `nav-scroll-${index}`, routeDir);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const hoverSelectors = [
    ["more", "text=More"],
    ["book-call", "text=Book a Call"],
    ["hero-cta", "text=Let's Connect"],
    ["first-project", "article, a[href*='/projects/']"],
    ["first-card", "section div[class*='rounded']"],
  ];

  for (const [name, selector] of hoverSelectors) {
    try {
      const locator = page.locator(selector).first();
      if ((await locator.count()) === 0) continue;
      await locator.hover({ timeout: 3000 });
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(routeDir, `hover-${name}.png`), fullPage: false });
      await snapshotLocator(locator, `hover-${name}`, routeDir);
      if (name === "more") {
        await snapshotLocator(page.locator("text=Guestbook"), "more-dropdown-guestbook", routeDir);
        await snapshotLocator(page.locator("text=Bucket List"), "more-dropdown-bucket-list", routeDir);
      }
    } catch (error) {
      await fs.writeFile(path.join(routeDir, `hover-${name}-error.txt`), String(error));
    }
  }

  await fs.writeFile(path.join(routeDir, "network.json"), JSON.stringify(network, null, 2));
  return { route, safeName, computed, networkCount: network.length };
}

await fs.mkdir(outDir, { recursive: true });
await extractStaticClues();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1200 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
});
const page = await context.newPage();

const routeSummaries = [];
for (const route of routes) {
  routeSummaries.push(await captureRoute(page, route));
}

await browser.close();

await fs.writeFile(
  path.join(outDir, "summary.json"),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      baseUrl,
      mirrorDir,
      routes: routeSummaries.map(({ route, safeName, networkCount }) => ({ route, safeName, networkCount })),
      note: "Use per-route layout.json plus hover/nav JSON files for exact computed styles, measurements, and interaction states.",
    },
    null,
    2,
  ),
);

console.log(`Reference style audit written to ${outDir}`);
