# BitDriven English Learning Site (Frontend)

An interactive, cartoon-themed English learning web app for children, built with React + Vite and hosted on GitHub Pages.

## Features

- **Age-based word tiers** (Ages 3-5, 6-10, 10-12, 12-16, 16-18)
- **Interactive scenarios** with cartoon characters and text-to-speech
- **Dictionary view** per age tier with UK English pronunciation
- **Functional Phrases** module
- **Completely Free** — All content is accessible without login
- **Dynamic Content** — Vocabulary is loaded dynamically from a Cloudflare Worker D1 database

## Architecture

```
┌──────────────────────────────┐
│   GitHub Pages (Frontend)    │
│   React + Vite (Static)      │
│                              │
│  ┌─────────────────────────┐ │
│  │ src/services/api.js     │─┼──►  Cloudflare Worker (Backend)
│  │ src/data/dictionary.js  │ │     └── D1 Database (SQLite)
│  │ src/components/         │ │         ├── words table
│  └─────────────────────────┘ │         └── functional_phrases table
└──────────────────────────────┘
```

## Setup

```bash
npm install
npm run dev          # Start local dev server (http://localhost:5173)
npm run build        # Build for production
```

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE=http://localhost:8787         # Local backend
# VITE_API_BASE=https://your-worker.workers.dev  # Production backend
```

## Deployment

Deployed automatically to GitHub Pages via GitHub Actions on push to `main`.

## Backend

The backend lives in a **separate repository**: [bitdriven_backend](https://github.com/liumaimiao/bitdriven_backend). See the backend README for setup instructions.
