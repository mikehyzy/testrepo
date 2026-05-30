# Centaur · the instrument

A real-time **cognition signal** — it tells you, moment to moment, whether you're *thinking with*
the AI (**enhancing**) or handing your thinking over to it (**offloading**).

> *Adiutor, non dominus.* — A helper, not a master.

This is a Vite + React implementation of the Centaur Design System handoff. It is a **multi-page**
build with two surfaces:

**`index.html` — the site** (marketing / manifesto): hero "the seam", the cognitive-debt thesis,
the half-human/half-machine duality, how it works, the evidence, and pricing, with a "keep your edge"
sign-up modal.

**`product.html` — the instrument** (the app): a left nav rail and three views:

- **Workspace** — a memo editor with an AI "suggested continuation", a docked instrument panel (live
  cognition gauge + session ledger), and a nudge that fires when you accept a suggestion.
- **The Ledger** — a weekly review of how you thought.
- **Meditation** — a nightly Stoic review.

The site links into the app ("see the instrument") and the app's rail links back to the site.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/testrepo/  (site) and /testrepo/product.html (app)
npm run build    # production build → dist/  (index.html + product.html)
npm run preview  # preview the production build
```

## Structure

- `index.html` / `src/site-main.jsx` / `src/Site.jsx` — the marketing site entry.
- `product.html` / `src/main.jsx` / `src/App.jsx` — the instrument app entry (nav rail + view state).
- `src/components/SiteSections.jsx` — Hero, Thesis, Duality, HowItWorks, Proof, Pricing.
- `src/components/ProductScreens.jsx` — Workspace, Ledger, Meditation.
- `src/components/Shared.jsx` — brand primitives shared by both (Icon, Mark, Wordmark, Btn, Gauge,
  Chip, TopNav, SiteFooter, …).
- `src/styles/colors_and_type.css` — the design-system token source of truth (colors, type, spacing,
  elevation, motion) plus the Google Fonts import (Cinzel · Newsreader · JetBrains Mono).
- `src/styles/app.css` / `src/styles/site.css` — per-surface shells.

Icons use [`lucide-react`](https://lucide.dev) (stroke-only, instrument-grade).
