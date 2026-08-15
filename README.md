# Ekow Sam Farms

Frontend for **Ekow Sam Farms** — a poultry farm in Kasoa, Ghana supplying farm-fresh eggs,
dressed chicken, live broilers, and point-of-lay pullets across Greater Accra.

Static single-page app, deployed on **Cloudflare Pages**.

## Features

- **Farm Store** — browse and order eggs, dressed chicken, live birds, and Kosua ne Meko, with a cart and checkout flow.
- **Events** — open farm days, farm-gate markets, and investor tours, with upcoming/past filtering and RSVP.
- **Training** — poultry masterclasses (broiler management, commercial layer production, turnkey setup) with registration.
- **Gallery** — real photography from inside the layer house, broiler pens, and packing floor.
- **Poultry Estimator** — batch and yield calculator for planning a flock.
- **Insights** — practical guides on poultry health, egg freshness, and running a poultry business.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **Lucide React** for icons

Routing is state-based (`currentPage` in `src/App.tsx`), not URL-based — see the caveat under Deployment.

## Run Locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

> **Windows note:** if the build fails with `Cannot find module '../lightningcss.win32-x64-msvc.node'`,
> the install was created on a different platform. Delete `node_modules` and re-run `npm install`.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
npm run lint       # typecheck (tsc --noEmit)
```

## Deployment — Cloudflare Pages

### Option A: Git integration (recommended)

Connect the repo in the Cloudflare dashboard (**Workers & Pages → Create → Pages → Connect to Git**) with:

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `20` or later (set `NODE_VERSION` env var if needed) |

Every push to `main` deploys to production; other branches get preview URLs.

### Option B: Direct upload via Wrangler

```bash
npm run deploy     # builds, then runs `wrangler pages deploy dist`
```

Requires `npx wrangler login` once. Project settings live in `wrangler.toml`.

### Pages configuration in this repo

- **`public/_redirects`** — SPA fallback (`/* /index.html 200`). Cloudflare matches static
  assets first, so this only catches app routes.
- **`public/_headers`** — security headers plus cache policy: immutable for fingerprinted
  `/assets/*`, daily revalidation for `/images/*`, no-cache for `index.html`.
- **`wrangler.toml`** — sets `pages_build_output_dir = "dist"`.

> **Note on routing:** navigation is state-based, so the whole site is served from `/`.
> Deep links like `/events` fall back to `index.html` and land on the home page.
> Moving to real URLs would require adding a router (e.g. React Router) — worth doing
> if individual pages need to be shareable or indexed separately.

## Project Structure

- `src/components/` — Header, Footer, cart drawer, checkout, quick view, poultry calculator
- `src/pages/` — Home, About, Services, Store, Training, Events, Gallery, Insights, Contact
- `src/data/farmData.ts` — single source of truth for products, workshops, events, gallery, blog, FAQs
- `src/types.ts` — TypeScript interfaces for all data models
- `public/images/` — optimized WebP farm photography

## Contact

- **Email:** [hello@ekowsamfarms.com](mailto:hello@ekowsamfarms.com) / [samderreck@gmail.com](mailto:samderreck@gmail.com)
- **Phone:** 055 519 8194
- **Location:** Millenium City, Kasoa / DL hospital street, Accra, Ghana
