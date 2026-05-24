# Folder Guide

This document explains what each major folder is for.

## Root

- `backend/` — Express + MongoDB API
- `frontend/` — React UI
- `docs/` — architecture and conventions

## Backend

- `backend/src/config/` — env parsing, app configuration
- `backend/src/database/` — db connection, indexes, seeds (structure-only)
- `backend/src/shared/constants/` — enums shared across modules
- `backend/src/shared/errors/` — typed errors + mapping to HTTP
- `backend/src/shared/helpers/` — reusable small helpers (domain-agnostic)
- `backend/src/shared/utils/` — general utilities (formatting, time, etc.)
- `backend/src/shared/middlewares/` — reusable Express middleware (auth, validation, rate limits, error handler)
- `backend/src/shared/logs/` — logger config, log formatting
- `backend/src/shared/pagination/` — pagination helpers (parse/query/response meta)

### Backend modules

- `backend/src/modules/auth/` — registration/login/JWT identity
- `backend/src/modules/registry/` — Core API Registry layer (factual API info)
- `backend/src/modules/community/` — Community layer split into submodules:
  - `reviews/` — reviews/ratings/issueType
  - `upvotes/` — toggle upvote logic
  - `alternatives/` — API-to-API alternative links
  - `history/` — timeline/history events
- `backend/src/modules/discovery/` — home aggregations (trending/complaints/recently deprecated)

- `backend/logs/` — runtime logs directory (ignored by git)

## Frontend

- `frontend/src/app/routes/` — React Router route definitions
- `frontend/src/app/providers/` — app-level providers (QueryClient, Router, Toast)
- `frontend/src/app/config/` — runtime config (API base URL, env)

- `frontend/src/pages/` — route-level pages:
  - Home, Explore, API Details, Add API, Login, Register

- `frontend/src/layouts/` — shared layouts/shells

- `frontend/src/features/registry/` — registry data fetching + UI components
- `frontend/src/features/community/` — community features as subfolders:
  - `reviews/`, `upvotes/`, `alternatives/`, `history/`
- `frontend/src/features/auth/` — auth UI + hooks

- `frontend/src/components/ui/` — design-system primitives (button/input/card/badge)
- `frontend/src/components/common/` — reusable composed components
- `frontend/src/components/skeletons/` — skeleton loaders

- `frontend/src/lib/api/` — Axios client + interceptors
- `frontend/src/lib/query/` — TanStack Query client + query keys
- `frontend/src/lib/toast/` — toast wrappers/config
- `frontend/src/lib/motion/` — motion variants

- `frontend/src/hooks/` — shared hooks (debounce, media queries)
- `frontend/src/context/` — app contexts (auth session)
- `frontend/src/constants/` — enums/status colors, issueTypes
- `frontend/src/utils/` — shared utilities
- `frontend/src/animations/` — animation variants shared across components
- `frontend/src/assets/` — icons/images
- `frontend/src/styles/` — Tailwind entry + global styles
