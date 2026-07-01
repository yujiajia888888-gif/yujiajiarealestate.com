# Jiajia Yu Real Estate Website

This is a standalone static website for `yujiajiarealestate.ca`. It does not depend on Canva.

## Fastest Publishing Option: Netlify

1. Go to `https://app.netlify.com/drop`.
2. Drag the contents of this folder, or upload the ZIP package.
3. After Netlify publishes the temporary site, open **Domain management**.
4. Add custom domain: `yujiajiarealestate.ca`.
5. Netlify will show DNS records.
6. Copy those records into the DNS settings where you bought the domain.
7. In Netlify, set `yujiajiarealestate.ca` as the primary domain. Keep `www.yujiajiarealestate.ca` connected too if you want www to redirect to the root domain.

## GitHub Pages Option

This folder includes a `CNAME` file with:

```text
yujiajiarealestate.ca
```

Upload these files to your GitHub Pages repository, set the custom domain to `yujiajiarealestate.ca`, then point your domain DNS to GitHub Pages.

## Automatic Listing Updates

The site includes `listings.json`, `scripts/update-listings.mjs`, and a GitHub Actions workflow at `.github/workflows/update-listings.yml`.

- The website displays the first 6 eXp Québec listings from `listings.json`.
- GitHub Actions runs once per day and can also be run manually from **Actions > Update eXp Listings > Run workflow**.
- When the eXp profile page has new listings, the workflow updates `listings.json`, commits the change, and GitHub Pages republishes the site.

## Contact Form

The form opens an email draft to `Yujiajia0514@hotmail.com`. This works without a server. Later, it can be replaced by a CRM or form service.

## Included Domain Files

- `CNAME` for GitHub Pages
- `netlify.toml` for Netlify
- `vercel.json` for Vercel
- `robots.txt` and `sitemap.xml` for search engines
