# GigMap

A map-based app to find and create freelancer pins.

## Setup

1. Clone the repo: `git clone <repo-url>`
2. Install dependencies:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && npm install`
3. Set up environment variables: Copy `.env.example` to `.env` and fill in values.
4. Set up database: `cd backend && npx prisma migrate dev`
5. Run locally:
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`
6. Deploy: Run `./scripts/deploy.sh`

## Tech Stack
- Frontend: React, Vite, Leaflet, Tailwind CSS
- Backend: Express, Prisma, Neon PostgreSQL
- Deployment: Vercel
