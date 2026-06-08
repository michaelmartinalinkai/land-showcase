# Land Showcase — Simple Static Site

A clean, mobile-friendly single-page site to showcase land listings with photos, videos, and maps. No build step, no framework — just edit one file and deploy.

## Folder structure

```
land-showcase/
├── index.html      ← the page (don't usually need to touch)
├── styles.css      ← styling
├── script.js       ← renders the page from data.js
├── data.js         ← EDIT THIS — all your listings live here
├── vercel.json     ← Vercel config (caching for assets)
└── assets/
    ├── photos/     ← drop property photos here (.jpg / .png / .webp)
    └── videos/     ← drop property videos here (.mp4, ideally < 50MB each)
```

## How to add or edit a property

1. Open `data.js`
2. Copy one of the `{ ... }` blocks inside `PROPERTIES = [ ... ]`
3. Update the fields (price, size, description, etc.)
4. Drop new photos into `assets/photos/` and videos into `assets/videos/`
5. Reference them in `photos: [...]` and `videos: [...]`

## How to get GPS coordinates

1. Open Google Maps
2. Right-click the spot — the `lat, lng` shows at the top
3. Paste into `coords: { lat: -8.6442, lng: 115.1133 }`

## Preview locally

Just open `index.html` in your browser. That's it.
(Or run `npx serve` / `python3 -m http.server` inside the folder for a quick local server.)

## Deploy to Vercel — 3 ways, pick one

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
cd land-showcase
vercel
```

Follow the prompts. Done.

### Option B — Drag & drop on vercel.com

1. Sign up at https://vercel.com (free)
2. Click **New Project → Import** → **Browse** → select the `land-showcase` folder
   (or drag the folder onto the Vercel dashboard)
3. Framework preset: **Other**
4. Click **Deploy**

You'll get a URL like `https://your-project.vercel.app` in ~30 seconds.

### Option C — GitHub + Vercel (best for ongoing updates)

1. Push this folder to a GitHub repo
2. On vercel.com → **New Project → Import Git Repository**
3. Pick the repo → **Deploy**

Every time you push to GitHub, Vercel auto-redeploys.

## Notes on video hosting

Direct video files work great for short clips (< 50 MB each). Vercel's free tier includes:
- 100 GB bandwidth/month
- Files up to 100 MB

If you have many long videos and traffic grows, consider switching to YouTube/Vimeo embeds later — `data.js` would just need a small tweak.

## Custom domain

After deploying, in Vercel dashboard:
**Settings → Domains → Add** → enter your domain → follow the DNS instructions.
