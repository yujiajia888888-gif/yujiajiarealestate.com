import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { DEFAULT_LIMIT, extractListings, updateListingsFile } from "./update-listings.mjs";

const sampleBrokerHtml = `
<div class="mw-properties-container">
  <div class="col-xl-4 col-md-6 single-grid R all featured">
    <a href="/en/properties/mls/17932864" class="card h-100 border-0 overflow-hidden">
      <div class="bg-img card-img-top watermark-hover">
        <picture>
          <img src="https://realestate.marketingwebsites.ca/property-images/17932864/17932864-01.jpg" alt=" 2923 Rue des Galets">
        </picture>
        <div class="prop-label-bottom">For Sale</div>
        <h4 class="card-title">
          <small>Carignan, Montérégie</small>
          <br>
           2923 Rue des Galets
        </h4>
        <div class="card-footer border-0">
          <div class="no-gutters">
            <div class="col">
              <h4>
                <i class="icon-realestate-bed mr-2"></i>
                <span class="mr-3">2</span>
                <i class="icon-realestate-bathtub mr-2"></i>
                <span>1</span>
              </h4>
            </div>
            <div class="col-auto">
              <h4>$390,000</h4>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
  <div class="col-xl-4 col-md-6 single-grid R all featured">
    <a href="/en/properties/mls/27678671" class="card h-100 border-0 overflow-hidden">
      <div class="bg-img card-img-top watermark-hover">
        <picture>
          <img src="https://realestate.marketingwebsites.ca/property-images/27678671/27678671-01.jpg" alt=" 882 Rue de la Falaise">
        </picture>
        <div class="prop-label-bottom">For Sale</div>
        <h4 class="card-title">
          <small>Pincourt, Montérégie</small>
          <br>
           882 Rue de la Falaise
        </h4>
        <div class="card-footer border-0">
          <div class="no-gutters">
            <div class="col">
              <h4>
                <i class="icon-realestate-bed mr-2"></i>
                <span class="mr-3">3</span>
                <i class="icon-realestate-bathtub mr-2"></i>
                <span>2</span>
              </h4>
            </div>
            <div class="col-auto">
              <h4>$635,000</h4>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
`;

test("DEFAULT_LIMIT loads all available eXp listings", () => {
  assert.equal(DEFAULT_LIMIT, null);
});

test("extractListings returns normalized eXp listing cards up to the requested limit", () => {
  const listings = extractListings(sampleBrokerHtml, { limit: 1 });

  assert.deepEqual(listings, [
    {
      id: "17932864",
      status: "For Sale",
      price: "$390,000",
      address: "2923 Rue des Galets",
      location: "Carignan, Montérégie",
      beds: 2,
      bathrooms: 1,
      image:
        "https://realestate.marketingwebsites.ca/property-images/17932864/17932864-01.jpg",
      url: "https://expquebec.com/en/properties/mls/17932864",
    },
  ]);
});

test("extractListings tolerates wrapper and link attribute changes", () => {
  const changedWrapperHtml = sampleBrokerHtml
    .replace(/<\/a>\s*<\/div>/g, "</a></section>")
    .replace(
      '<a href="/en/properties/mls/17932864" class="card h-100 border-0 overflow-hidden">',
      '<a class="property-card" data-kind="listing" href="/en/properties/mls/17932864">',
    );

  const listings = extractListings(changedWrapperHtml, { limit: 1 });

  assert.equal(listings.length, 1);
  assert.equal(listings[0].id, "17932864");
  assert.equal(listings[0].address, "2923 Rue des Galets");
});

test("updateListingsFile keeps the existing file unchanged when listings did not change", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "listings-update-"));
  const input = path.join(tempDir, "broker.html");
  const output = path.join(tempDir, "listings.json");
  const existingPayload = {
    generatedAt: "2026-06-01T00:00:00.000Z",
    sourceUrl: "https://expquebec.com/en/brokers/jiajia-yu/",
    limit: 1,
    listings: extractListings(sampleBrokerHtml, { limit: 1 }),
  };
  const existingJson = `${JSON.stringify(existingPayload, null, 2)}\n`;

  await fs.writeFile(input, sampleBrokerHtml);
  await fs.writeFile(output, existingJson);

  await updateListingsFile({ input, output, limit: 1 });

  assert.equal(await fs.readFile(output, "utf8"), existingJson);
});

test("zero extracted listings only succeeds when valid existing data can be preserved", async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "listings-fallback-"));
  const input = path.join(tempDir, "broker.html");
  const output = path.join(tempDir, "listings.json");
  const missingOutput = path.join(tempDir, "missing", "listings.json");
  const existingPayload = {
    generatedAt: "2026-06-01T00:00:00.000Z",
    sourceUrl: "https://expquebec.com/en/brokers/jiajia-yu/",
    limit: null,
    listings: [
      {
        id: "17932864",
        status: "For Sale",
        price: "$390,000",
        address: "2923 Rue des Galets",
        location: "Carignan, Monteregie",
        beds: 2,
        bathrooms: 1,
        image: "https://example.com/17932864.jpg",
        url: "https://expquebec.com/en/properties/mls/17932864",
      },
    ],
  };
  const existingJson = `${JSON.stringify(existingPayload, null, 2)}\n`;

  await fs.writeFile(input, "<html><body>Temporary upstream response</body></html>");
  await fs.writeFile(output, existingJson);

  const result = await updateListingsFile({ input, output });

  assert.equal(result.preserved, true);
  assert.equal(result.unchanged, true);
  assert.equal(result.listings.length, 1);
  assert.equal(await fs.readFile(output, "utf8"), existingJson);
  await assert.rejects(
    updateListingsFile({ input, output: missingOutput }),
    /No listings found and no existing listing data is available/,
  );
});
