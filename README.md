# Centaur · the instrument

A real-time **cognition signal** — it tells you, moment to moment, whether you're *thinking with*
the AI (**enhancing**) or handing your thinking over to it (**offloading**).

> *Adiutor, non dominus.* — A helper, not a master.

This is a Vite + React implementation of the `product.html` design from the Centaur Design System
handoff. It has a left nav rail and three views:

- **Workspace** — a memo editor with an AI "suggested continuation", a docked instrument panel (live
  cognition gauge + session ledger), and a nudge that fires when you accept a suggestion.
- **The Ledger** — a weekly review of how you thought.
- **Meditation** — a nightly Stoic review.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Structure

- `src/App.jsx` — app root: nav rail + view switching and the gauge/event state.
- `src/components/Shared.jsx` — brand primitives (Icon, Mark, Wordmark, Btn, Gauge, Chip, …).
- `src/components/ProductScreens.jsx` — Workspace, Ledger, Meditation.
- `src/styles/colors_and_type.css` — the design-system token source of truth (colors, type, spacing,
  elevation, motion) plus the Google Fonts import (Cinzel · Newsreader · JetBrains Mono).
- `src/styles/app.css` — the app shell (scrollbars, rail tooltips, base layout).

Icons use [`lucide-react`](https://lucide.dev) (stroke-only, instrument-grade).
