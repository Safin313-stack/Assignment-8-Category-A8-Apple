# TileVerse – Tile Gallery

A premium tile gallery web application built with Next.js App Router.

**Live URL:** _Add your deployment URL here_

## Project Purpose

A website to showcase a curated tile gallery with authentication, search, and a detailed view for each tile.

## Key Features

- 🏠 Home page — hero banner ("Discover Your Perfect Aesthetic" + "Browse Now"), animated marquee, top 4 featured tiles with SwiperJS carousel
- 🖼️ All Tiles gallery — real-time search by title using Hero UI-style input
- 🔍 Single tile detail page — large image left, info right, tags, creator, style description (private route)
- 🔐 Authentication — email/password + Google OAuth via BetterAuth with MongoDB
- 👤 My Profile page — view profile data (private route)
- ✏️ Update Profile — update name & image URL
- 📱 Fully responsive — mobile, tablet, desktop
- 🎨 Unique dark luxury design with gold accents
- ⚡ Middleware-based private route protection
- 🔄 JSON Server for tile data REST API
- 💫 animate.css animations on banner
- 🃏 SwiperJS carousel for featured tiles
- 🍞 Toast notifications for auth feedback
- ❌ Custom 404 not-found page
- ⏳ Loader shown during data fetching

## NPM Packages Used

- `better-auth` – Authentication with MongoDB adapter
- `mongodb` – MongoDB native driver
- `daisyui` – UI components (navbar, buttons, dividers)
- `swiper` – SwiperJS carousel for featured tiles
- `animate.css` – Banner entry animations
- `react-hot-toast` – Toast notifications
- `json-server` – Mock REST API for tile data
- `axios` – HTTP client

## Route Permissions

| Route | Access |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | **Private** |
| `/my-profile` | **Private** |
| `/update-profile` | **Private** |

## Setup

1. Clone the repo
2. `npm install`
3. Copy `.env.example` → `.env.local` and fill in:
   - `MONGODB_URI` – MongoDB Atlas connection string
   - `BETTER_AUTH_SECRET` – Random 32+ char secret
   - `BETTER_AUTH_URL` – Your app URL (e.g. http://localhost:3000)
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` – From Google Cloud Console
   - `NEXT_PUBLIC_JSON_SERVER_URL` – JSON server URL (default: http://localhost:5000)
4. Start JSON server: `npm run json-server`
5. Start dev server: `npm run dev`

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy JSON server separately on Render/Railway, update `NEXT_PUBLIC_JSON_SERVER_URL`
5. Ensure Vercel rewrites handle SPA routes (Next.js App Router handles this automatically)
# Assignment-8-Category-A8-Apple
