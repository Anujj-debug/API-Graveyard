# API Graveyard

Developer-focused API reputation & discovery platform.

## Product focus

API Graveyard helps developers:
- explore APIs
- read/write reviews
- report developer pain points
- discover alternatives
- track API reputation/history

This is **not** an API marketplace, monitoring system, testing tool, or repo scanner.

## Core architecture rule: two layers (do not mix)

1) **Core API Registry Layer (Structured / factual)**
- Canonical API metadata: name, description, category, pricing type, status, website, logo, provider.

2) **Community Contribution Layer (Opinion / sentiment)**
- Reviews, ratings, complaints (issueType), pain level (1–10), alternatives (API ID refs), upvotes (toggle), history events.

## Project layout

- `backend/` — Node.js/Express API + MongoDB/Mongoose
- `frontend/` — React UI (Tailwind, Router, TanStack Query)
- `docs/` — architecture + conventions (structure-only; no feature code)

Start here:
- `docs/architecture.md`
- `docs/folder-guide.md`
- `docs/conventions.md`
