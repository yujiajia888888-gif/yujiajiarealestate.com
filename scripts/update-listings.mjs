import fs from "node:fs/promises";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SOURCE_URL = "https://expquebec.com/en/brokers/jiajia-yu/";
export const DEFAULT_LIMIT = 9;

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const defaultOutputPath = path.resolve(scriptDir, "..", "listings.json");

const entityMap = {
  amp: "&",
  apos: "'",
  copy: "©",
  eacute: "é",
  Eacute: "É",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

const decodeHtml = (value = "") =>
  value.replace(/&(#x?[0-9a-f]+|[a-zA-Z]+);/g, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const code = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }

    return entityMap[entity] || match;
  });

const stripTags = (value = "") => value.replace(/<[^>]*>/g, " ");

const cleanText = (value = "") => decodeHtml(stripTags(value)).replace(/\s+/g, " ").trim();

const absoluteUrl = (url, sourceUrl = SOURCE_URL) => new URL(decodeHtml(url), sourceUrl).toString();

const firstMatch = (html, regex) => {
  const match = html.match(regex);
  return match ? match[1] : "";
};

const parseNumber = (value) => {
  const parsed = Number.parseInt(cleanText(value), 10);
  return Number.isFinite(parsed) ? parsed : null;
};

export function extractListings(html, { limit = DEFAULT_LIMIT, sourceUrl = SOURCE_URL } = {}) {
  const cardRegex = /<a\s+href=["']([^"']*\/en\/properties\/mls\/(\d+)[^"']*)["'][^>]*>([\s\S]*?)<\/a>\s*<\/div>/gi;
  const listings = [];
  const seen = new Set();

  for (const match of html.matchAll(cardRegex)) {
    const [, href, id, cardHtml] = match;
    if (!id || seen.has(id)) continue;

    const titleHtml = firstMatch(cardHtml, /<h4[^>]*class=["'][^"']*card-title[^"']*["'][^>]*>([\s\S]*?)<\/h4>/i);
    const location = cleanText(firstMatch(titleHtml, /<small[^>]*>([\s\S]*?)<\/small>/i));
    const address = cleanText(titleHtml.replace(/<small[^>]*>[\s\S]*?<\/small>/i, "").replace(/<br\s*\/?>/gi, " "));
    const image = firstMatch(cardHtml, /<img[^>]+src=["']([^"']+)["']/i);
    const price =
      cleanText(firstMatch(cardHtml, /data-price=["']([^"']+)["']/i)) ||
      cleanText(firstMatch(cardHtml, /<div[^>]*class=["'][^"']*col-auto[^"']*["'][^>]*>\s*<h4[^>]*>([\s\S]*?)<\/h4>/i));
    const status = cleanText(firstMatch(cardHtml, /<div[^>]*class=["'][^"']*prop-label-bottom[^"']*["'][^>]*>([\s\S]*?)<\/div>/i));
    const beds = parseNumber(firstMatch(cardHtml, /icon-realestate-bed[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i));
    const bathrooms = parseNumber(firstMatch(cardHtml, /icon-realestate-bathtub[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i));

    if (!address || !image || !price) continue;

    seen.add(id);
    listings.push({
      id,
      status: status || "For Sale",
      price,
      address,
      location,
      beds,
      bathrooms,
      image: absoluteUrl(image, sourceUrl),
      url: absoluteUrl(href, sourceUrl),
    });

    if (listings.length >= limit) break;
  }

  return listings;
}

export function buildListingsPayload(html, { limit = DEFAULT_LIMIT, sourceUrl = SOURCE_URL } = {}) {
  return {
    generatedAt: new Date().toISOString(),
    sourceUrl,
    limit,
    listings: extractListings(html, { limit, sourceUrl }),
  };
}

export function fetchText(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "User-Agent": "Mozilla/5.0 (compatible; JiajiaYuListingUpdater/1.0)",
        },
      },
      (response) => {
        const redirect = response.headers.location;
        if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && redirect) {
          response.resume();
          resolve(fetchText(new URL(redirect, url).toString()));
          return;
        }

        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`Request failed with status ${response.statusCode}`));
          return;
        }

        response.setEncoding("utf8");
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => resolve(body));
      },
    );

    request.on("error", reject);
    request.end();
  });
}

export async function updateListingsFile({
  input,
  output = defaultOutputPath,
  limit = DEFAULT_LIMIT,
  sourceUrl = SOURCE_URL,
} = {}) {
  const html = input ? await fs.readFile(input, "utf8") : await fetchText(sourceUrl);
  const payload = buildListingsPayload(html, { limit, sourceUrl });

  if (payload.listings.length === 0) {
    throw new Error("No listings found. eXp page structure may have changed.");
  }

  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(payload, null, 2)}\n`);
  return payload;
}

const parseArgs = (argv) =>
  argv.reduce(
    (options, arg) => {
      if (arg.startsWith("--input=")) options.input = arg.slice("--input=".length);
      if (arg.startsWith("--output=")) options.output = arg.slice("--output=".length);
      if (arg.startsWith("--limit=")) options.limit = Number.parseInt(arg.slice("--limit=".length), 10);
      if (arg.startsWith("--source=")) options.sourceUrl = arg.slice("--source=".length);
      return options;
    },
    { limit: DEFAULT_LIMIT, output: defaultOutputPath, sourceUrl: SOURCE_URL },
  );

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  updateListingsFile(parseArgs(process.argv.slice(2)))
    .then((payload) => {
      console.log(`Updated ${payload.listings.length} listings in listings.json`);
    })
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}

