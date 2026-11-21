# A11 domain cutover: www canonical

## Intended public routing

- Primary site: https://www.a11-k.space/
- Legacy evidence hostname: https://evidence.a11-k.space/
- Redirect: permanent 301 from the evidence hostname to the same path and query on www.

## Repository changes in this branch

- GitHub Pages custom-domain file is set to `www.a11-k.space`.
- HTML canonical URLs and sitemap URLs use the www hostname.
- The Evidence Room remains excluded from the public sitemap and from search crawling.
- `cloudflare/evidence-redirect.js` is the redirect Worker source.

## Cloudflare cutover (requires Cloudflare account access)

1. Confirm `www.a11-k.space` DNS resolves to the GitHub Pages target and that GitHub Pages custom domain verification succeeds.
2. Bind the Worker in `cloudflare/evidence-redirect.js` to route `evidence.a11-k.space/*`.
3. Keep the evidence hostname DNS proxied through Cloudflare so the Worker route can run.
4. Test root and nested routes, including `/frontiers/`, `/builders/`, `/skills/`, `/docs/`, `/access/`, and `/release-gate/`.
5. Verify every redirect is HTTPS, 301, preserves path/query, and terminates on `www.a11-k.space`.
6. Verify canonical tags, sitemap, robots, TLS, and mobile navigation after the Pages deployment.

Do not delete the evidence hostname's DNS record before the Worker route is active. Do not treat a successful Pages build as proof that the Cloudflare redirect is live.

## Rollback

Disable the Worker route and restore the previous Pages custom domain only if the www host fails verification. Keep a record of the prior DNS values before changing them.

## Current limitation

This repository change does not edit Cloudflare DNS, deploy a Worker, or publish to production. Those steps require Cloudflare access and an owner-approved cutover.
