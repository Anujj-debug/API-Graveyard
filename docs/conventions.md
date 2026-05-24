# Conventions

## Naming conventions

### General
- Folders: `kebab-case`
- Files: `kebab-case` on backend; `PascalCase` for React components.

### Backend
- Route files: `*-routes.js`
- Controller files: `*-controller.js`
- Service files: `*-service.js`
- Validator files: `*-validator.js`
- Model files: `*.model.js` (or `*-model.js` — pick one and keep it consistent)

### Frontend
- Components: `PascalCase.tsx` / `PascalCase.jsx`
- Hooks: `useSomething.ts` / `useSomething.js`
- Feature folders: `kebab-case`

## Separation of concerns

Backend:
- `routes/` wires URL -> controller only
- `controllers/` handle HTTP details (req/res/status) and call services
- `services/` contain business rules, aggregation logic, and cross-module orchestration
- `models/` define persistence schema only
- `validators/` ensure request shape is valid before controllers run

Frontend:
- `pages/` are route-level screens
- `features/*` contain domain UI + queries for a single feature
- `components/ui/*` contain reusable primitives (button/input/card/badge)
- `lib/api/*` centralizes Axios base client + auth header injection
- `lib/query/*` centralizes TanStack Query client + query keys

## Error handling (backend)

- Throw typed errors from services (e.g., `ValidationError`, `ForbiddenError`).
- Convert to HTTP responses in a single error middleware.
- Keep error codes stable for the frontend.

## Pagination/search

- Use `page`, `limit`, `q`, `sort`, and filters (`status`, `pricingType`, `category`).
- Prefer response shape: `{ data, meta: { page, limit, total, hasNext } }`.
