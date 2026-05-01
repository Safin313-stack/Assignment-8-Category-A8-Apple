![TileVerse Banner](https://capsule-render.vercel.app/api?type=waving&color=0:1a1200,50:c9a84c,100:0f0e0a&height=200&section=header&text=TileVerse&fontSize=58&fontColor=ffffff&fontAlignY=38&desc=A+tile+gallery+app+built+with+Next.js+and+BetterAuth&descAlignY=60&descSize=15&descColor=f0d080)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Deployed](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://assignment-8-category-a8-apple-swac.vercel.app)
[![PH Batch](https://img.shields.io/badge/Programming%20Hero-Batch%2013-f97316?style=flat-square)](https://web.programming-hero.com)

[![Live Demo](https://img.shields.io/badge/-%F0%9F%9A%80%20%20LIVE%20DEMO%20%20%E2%86%92-c9a84c?style=for-the-badge&logoColor=white)](https://assignment-8-category-a8-apple-swac.vercel.app)

✦ Browse tiles · View details · Login required for private pages ✦

---

## What This Project Does

| 🏠 Home Page | 🖼️ Tile Gallery | 🔍 Tile Details | 🔐 Auth | 👤 Profile | 📱 Responsive |
|---|---|---|---|---|---|
| Hero banner + marquee + featured tiles carousel | Search all tiles by title | Large image, tags, creator info | Email/password + Google OAuth | View and update your info | Works on all screen sizes |

---

## Page Structure

```
╔══════════════════════════════════════════════════════════════╗
║  ◈ TileVerse          Home · All Tiles · My Profile  Login  ║  ← Navbar
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   Discover Your              [ Browse Now ]                  ║  ← Hero Banner
║   Perfect Aesthetic                                          ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  New Arrivals: Ceramic Blue Tile | Weekly Feature: ...  →   ║  ← Marquee
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ╔══════╗  ╔══════╗  ╔══════╗  ╔══════╗   ← SwiperJS        ║
║  ║Tile 1║  ║Tile 2║  ║Tile 3║  ║Tile 4║     Carousel        ║  ← Featured
║  ║[View]║  ║[View]║  ║[View]║  ║[View]║                     ║
║  ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝                     ║
╠══════════════════════════════════════════════════════════════╣
║  🔍 Search tiles...                                          ║  ← All Tiles
║  ╔══════╗  ╔══════╗  ╔══════╗  ╔══════╗                     ║
║  ║Tile  ║  ║Tile  ║  ║Tile  ║  ║Tile  ║                     ║
║  ╚══════╝  ╚══════╝  ╚══════╝  ╚══════╝                     ║
╠══════════════════════════════════════════════════════════════╣
║  [ Large Image ]    Title / Creator / Tags / Price           ║  ← Tile Detail
╠══════════════════════════════════════════════════════════════╣
║  Login · Register · My Profile · Update Profile              ║  ← Auth Pages
╚══════════════════════════════════════════════════════════════╝
```

---

## Key Features

### BetterAuth — Email + Google Login

```ts
// lib/auth.ts
export const auth = betterAuth({
  database: mongodbAdapter(client.db("tiles-gallery")),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
```

### Middleware — Private Route Protection

```ts
// middleware.ts
const privateRoutes = ["/my-profile", "/update-profile", "/tile"];

export function middleware(request: NextRequest) {
  const isPrivate = privateRoutes.some(r => pathname.startsWith(r));
  if (isPrivate && !sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
```

### SwiperJS — Featured Tiles Carousel

```tsx
// components/FeaturedSwiper.tsx
<Swiper
  modules={[Autoplay, Navigation, Pagination]}
  slidesPerView={1}
  autoplay={{ delay: 3500 }}
  breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
>
  {tiles.map(tile => <SwiperSlide key={tile.id}><TileCard tile={tile} /></SwiperSlide>)}
</Swiper>
```

### JSON Server — Tile Data API

```json
{
  "id": "tile_001",
  "title": "Ceramic Blue Tile",
  "category": "ceramic",
  "price": 45.99,
  "material": "Ceramic",
  "inStock": true,
  "creator": "ArtisanTile Co.",
  "tags": ["Blue", "Minimalist", "Modern"]
}
```

---

## Project Structure

```
Assignment-8-Category-A8-Apple/
│
├── 📄 middleware.ts          ← Private route protection
├── ⚙️  next.config.ts
├── 📦 package.json
├── 🔒 .env.example
│
├── 📂 app/
│   ├── 🏠 page.tsx           ← Home (banner + marquee + featured)
│   ├── 🖼️  all-tiles/        ← Gallery with search
│   ├── 🔍 tile/[id]/         ← Tile detail (private)
│   ├── 🔐 login/             ← Login page
│   ├── 📝 register/          ← Register page
│   ├── 👤 my-profile/        ← Profile page (private)
│   ├── ✏️  update-profile/   ← Update name & photo (private)
│   └── ❌ not-found.tsx      ← 404 page
│
├── 📂 components/
│   ├── Navbar.tsx            ← Nav with auth state
│   ├── Footer.tsx            ← Footer with social links
│   ├── TileCard.tsx          ← Reusable tile card
│   ├── FeaturedSwiper.tsx    ← SwiperJS carousel
│   └── Loader.tsx            ← Loading spinner
│
├── 📂 lib/
│   ├── auth.ts               ← BetterAuth server config
│   └── auth-client.ts        ← BetterAuth client hooks
│
└── 📂 data/
    └── tiles.json            ← JSON server tile data (8 tiles)
```

---

## Route Permissions

```
┌─────────────────────┬───────────────────────────────────┐
│  Route              │  Access                           │
├─────────────────────┼───────────────────────────────────┤
│  /                  │  ✅ Public                        │
│  /all-tiles         │  ✅ Public                        │
│  /login             │  ✅ Public                        │
│  /register          │  ✅ Public                        │
│  /tile/[id]         │  🔒 Private (login required)      │
│  /my-profile        │  🔒 Private (login required)      │
│  /update-profile    │  🔒 Private (login required)      │
└─────────────────────┴───────────────────────────────────┘
```

---

## NPM Packages Used

```
┌──────────────────────────────────────────────────────────────┐
│  Next.js · TypeScript · DaisyUI · SwiperJS · Animate.css     │
├──────────────────┬───────────────────────────────────────────┤
│  better-auth     │  Authentication (email + Google OAuth)    │
│  mongodb         │  MongoDB native driver for BetterAuth     │
│  daisyui         │  UI component library                     │
│  swiper          │  Featured tiles carousel                  │
│  animate.css     │  Hero banner animations                   │
│  react-hot-toast │  Toast notifications                      │
│  json-server     │  Mock REST API for tile data              │
│  axios           │  HTTP client                              │
└──────────────────┴───────────────────────────────────────────┘
```

---

## Getting Started

**Live (no setup needed)**

> 🔗 **https://assignment-8-category-a8-apple-swac.vercel.app**

**Run Locally**

```bash
git clone https://github.com/Safin313-stack/Assignment-8-Category-A8-Apple.git
cd Assignment-8-Category-A8-Apple
npm install
```

Copy `.env.example` to `.env.local` and fill in:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=any_random_32_char_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:5000
```

Start both servers:

```bash
# Terminal 1 — tile data
npm run json-server

# Terminal 2 — app
npm run dev
```

Open `http://localhost:3000` ✅

---

## Tech Stack

```
┌──────────────────────────────────────────────────────────┐
│      Next.js · BetterAuth · MongoDB · DaisyUI            │
├─────────────────────┬────────────────────────────────────┤
│  Next.js 15         │  App Router, server components     │
│  TypeScript         │  Type safety throughout            │
│  BetterAuth         │  Auth with MongoDB adapter         │
│  MongoDB Atlas      │  Database for users and sessions   │
│  DaisyUI + Tailwind │  Styling and UI components         │
│  SwiperJS           │  Touch-friendly carousel           │
│  Animate.css        │  CSS animations                    │
│  JSON Server        │  Mock REST API for tiles           │
└─────────────────────┴────────────────────────────────────┘
```

---

## Developer

**Saharia Hassan Safin**
Front-end Developer · Programming Hero Batch 13

[![GitHub](https://img.shields.io/badge/GitHub-Safin313--stack-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Safin313-stack)
[![Live Project](https://img.shields.io/badge/Live%20Project-Visit%20Now-c9a84c?style=for-the-badge&logo=vercel&logoColor=white)](https://assignment-8-category-a8-apple-swac.vercel.app)

---

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0f0e0a,50:1a1915,100:c9a84c&height=120&section=footer)

MIT License · © 2025 Saharia Hassan Safin · ⭐ Star if it helped you!
