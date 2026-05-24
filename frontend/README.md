# Frontend Structure

Frontend is organized for a modern developer SaaS UI:
- Route-level pages are thin.
- Feature folders own API calls + query hooks + UI pieces.
- Shared UI primitives live in `components/ui`.

## Centralized API handling

`src/lib/api/` is where the Axios client lives.
This keeps base URL, headers, auth token injection, and error shaping consistent.

## Centralized query handling

`src/lib/query/` is where the TanStack Query client + query keys live.
Feature folders define query hooks but reuse shared clients and key factories.

## Route protection

Protected routes belong in `src/app/routes/` (guards/wrappers) and `src/features/auth/` (session state).

No implementation has been added yet.
