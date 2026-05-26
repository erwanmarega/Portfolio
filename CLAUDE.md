# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview the production build locally
node server.js    # Start the Express email backend (port 10000)
```

No lint or test scripts are configured.

## Architecture

This is a **Vue 3 + Vite** personal portfolio (ewmdev.com) composed of two independent parts:

### Frontend (`src/`)
A single-page scroll experience — **not** a traditional multi-page router app. `App.vue` stacks all views as `position: sticky` sections so they layer on top of each other as the user scrolls. The router (`src/router/index.js`) exists but is not used for navigation in the main layout; all sections are rendered directly in `App.vue` via component imports.

Section order (top → bottom): `home → about → education → hard_skills → veille → Text → créations → contact`

**Key patterns:**
- `useEnterAnimation` composable (`src/composables/useEnterAnimation.js`) — triggers a one-shot callback when the user scrolls to a section's index. Views call this with a GSAP animation function.
- `ParticleCanvas.vue` — custom canvas animation (90 indigo particles with connecting lines), used as a background on the home view.
- `StaticChatbot.vue` — keyword-based chat widget (no AI backend), fixed bottom-right, uses `v-html` to render links in bot responses.
- Font Awesome icons are registered globally in `main.js` and per-component where additional icons are needed.
- `@` alias resolves to `src/`.

**Styling:** Tailwind CSS v3 + `animate.css` + scoped `<style>` blocks per component. Global base styles in `src/assets/main.css` and `src/assets/base.css`.

### Backend (`server.js`)
An Express server deployed separately on **Render** (`https://ewmnode.onrender.com`). Its only endpoint is `POST /send-email`, which forwards contact form submissions via Nodemailer/Gmail. Requires `USER` and `PASS` env vars (Gmail credentials).

The frontend contact form (`src/views/contact.vue`) calls `https://ewmnode.onrender.com/send-email` directly (hardcoded URL), using `VITE_API_URL` only for a guard check. The `vercel.json` proxies `/api/*` to Render but the form does not use that proxy.

### Deployment
- Frontend → **Vercel** (static, `dist/`)
- Backend → **Render** (Node.js, `server.js`)
- Domain: `https://www.ewmdev.com`

### Environment variables
| Variable | Used by | Purpose |
|---|---|---|
| `VITE_API_URL` | Frontend (guard only) | API base URL check |
| `USER` | `server.js` | Gmail sender address |
| `PASS` | `server.js` | Gmail app password |
