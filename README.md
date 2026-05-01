# TileVerse - Tiles Gallery

**Live URL:** https://your-live-url.vercel.app

**Category:** A8 - Apple

---

## What is this project?

A tile gallery website where users can browse and view premium tiles. Users need to login to see tile details and their profile. Built with Next.js App Router and BetterAuth for authentication.

---

## Key Features

- Home page with banner, scrolling marquee and featured tiles
- All tiles page with search by title
- Single tile details page (login required)
- Login and Register with email/password and Google
- My Profile page to view account info
- Update profile name and photo
- Custom 404 page
- Loading spinner on data fetch
- Fully responsive on mobile, tablet and desktop

---

## NPM Packages Used

| Package | Why |
|---|---|
| `better-auth` | Authentication (email + Google OAuth) |
| `mongodb` | MongoDB native driver for BetterAuth |
| `daisyui` | UI components |
| `swiper` | Carousel for featured tiles on home page |
| `animate.css` | Animations on hero banner |
| `react-hot-toast` | Toast notifications |
| `json-server` | Mock REST API to serve tile data |
| `axios` | HTTP requests |

---

## Routes

| Route | Public or Private |
|---|---|
| `/` | Public |
| `/all-tiles` | Public |
| `/login` | Public |
| `/register` | Public |
| `/tile/[id]` | Private (login required) |
| `/my-profile` | Private (login required) |
| `/update-profile` | Private (login required) |

---

## How to Run Locally

1. Clone the repo
```
git clone https://github.com/Safin313-stack/Assignment-8-Category-A8-Apple.git
cd Assignment-8-Category-A8-Apple
```

2. Install packages
```
npm install
```

3. Copy `.env.example` to `.env.local` and fill in your values
```
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=any_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_JSON_SERVER_URL=http://localhost:5000
```

4. Run JSON server (in one terminal)
```
npm run json-server
```

5. Run the app (in another terminal)
```
npm run dev
```

Open `http://localhost:3000`
