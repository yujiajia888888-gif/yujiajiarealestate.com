import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexHtml = await fs.readFile(path.join(siteRoot, "index.html"), "utf8");
const scriptJs = await fs.readFile(path.join(siteRoot, "script.js"), "utf8");

const agencyListingsUrl = "https://expquebec.com/en/properties/";
const brokerProfileUrl = "https://expquebec.com/en/brokers/jiajia-yu/";

const getAnchorByI18nKey = (key) => {
  const anchor = [...indexHtml.matchAll(/<a\b[^>]*>/g)].find((match) =>
    match[0].includes(`data-i18n="${key}"`),
  );
  return anchor?.[0] || "";
};

test("primary eXp CTA links to the agency-wide listings page", () => {
  const anchor = getAnchorByI18nKey("exp.viewProfile");

  assert.match(anchor, new RegExp(`href="${agencyListingsUrl}"`));
  assert.match(scriptJs, /"exp\.viewProfile": "View all eXp agency listings"/);
});

test("secondary eXp CTA keeps Jiajia's broker profile link", () => {
  const anchor = getAnchorByI18nKey("exp.viewAll");

  assert.match(anchor, new RegExp(`href="${brokerProfileUrl}"`));
});
