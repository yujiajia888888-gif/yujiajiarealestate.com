import test from "node:test";
import assert from "node:assert/strict";

import { extractListings } from "./update-listings.mjs";

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

