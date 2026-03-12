# MusyCharts

> Discover and visualize your music taste through your Spotify listening history.

Live at 👉 [musycharts.deras.dev](https://musycharts.deras.dev/)

---

## Features

- 🎵 **Top Tracks & Artists** — View your most-played songs and artists across different time ranges.
- 🎸 **Top Genres** — Explore a breakdown of your favorite music genres.
- 📊 **Interactive Charts** — Rich visualizations powered by amCharts 5 (radar, gauge, bubble, and more).
- 🌐 **i18n Support** — Available in English and Spanish.
- 🌙 **Dark / Light Mode** — Toggle between themes at any time.
- 📱 **PWA Ready** — Installable as a Progressive Web App.
- ⚡ **Prerendered Landing Page** — SEO-optimized using `vite-plugin-prerender`.

---

## Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Vue 3 (Composition API) |
| Bundler    | Vite 7                  |
| Routing    | Vue Router 5            |
| i18n       | vue-i18n 11             |
| Charts     | amCharts 5              |
| Styling    | Tailwind CSS 4          |
| HTTP       | Axios                   |
| Linting    | OxLint + OxFmt          |
| Deployment | Vercel                  |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- A [Spotify Developer](https://developer.spotify.com/dashboard) application with a valid **Client ID** and the redirect URI set to your local or production URL.

### Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable                 | Description                                        |
| ------------------------ | -------------------------------------------------- |
| `VITE_SPOTIFY_CLIENT_ID` | Your Spotify application Client ID                 |
| `VITE_APP_URL`           | Base URL of the app (e.g. `http://localhost:5173`) |

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## Linting & Formatting

```bash
# Lint
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format
npm run fmt

# Check formatting
npm run fmt:check
```

---

## Deployment

The project is deployed on **Vercel**. A `vercel.json` file is included to correctly handle the SPA router (all routes are rewritten to `index.html`).

A `404.html` fallback is also included for static hosting environments that do not support server-side rewrites.

---

## Author

- [@daiv05](https://github.com/daiv05) — David Deras

## Feedback

Have a feature request or suggestion? Reach out at **david@deras.dev**.

## License

[MIT](./LICENSE.md)

---

<img src="https://musycharts.deras.dev/assets/musylogo22-220e9f8e.png" width="280" alt="MusyCharts logo">
