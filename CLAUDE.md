# FinCalcAI Project

## What We Are Building
A financial calculator portal for India targeting Google SEO.
Monetised via Google AdSense, affiliate marketing, lead generation, and SaaS API.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: FastAPI (Python 3.11)
- AI: Anthropic Claude API (claude-sonnet-4-6 model)
- Database: SQLite (dev), PostgreSQL (prod)
- Hosting: Netlify (frontend) + Railway (backend)

## Code Style
- All Indian currency formatted as: ₹XX,XX,XXX or in Lakhs/Crores
- Calculator results must be accurate to 2 decimal places
- Each calculator page must have unique meta title and description (for SEO)
- Mobile-first responsive design
- No external CSS frameworks beyond Tailwind

## Revenue Streams Built In
1. Google AdSense banner slots (top, sidebar, between results)
2. Affiliate card shown after every calculation result
3. Lead capture form on high-intent pages (home loan, insurance)
4. SaaS API endpoints under /api/v1/calculate/*
5. AI assistant powered by Claude API (premium feature)

## File Naming
- Calculator pages: src/pages/[calculator-name]-calculator.jsx
- Calculator logic: src/calculators/[name].js
- Always use kebab-case for files, camelCase for JS variables
