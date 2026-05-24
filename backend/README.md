# Backend Structure

This backend is organized for scalability using **modules** plus **shared** cross-cutting layers.

## Why a services layer exists

Controllers should stay thin (HTTP-only). Services exist to:
- hold business rules (upvote toggle rules, one-review-per-user constraints)
- orchestrate cross-module work (e.g., discovery aggregations reading registry + community)
- keep controllers easy to test and reason about

## Why validation is separate

Validation is a boundary concern:
- validates inputs before they hit business logic
- keeps controllers/services free from repetitive shape checks
- enables consistent error responses

## Reusable middlewares

`src/shared/middlewares/` hosts reusable middleware such as:
- auth guard (JWT)
- request validation execution
- global error handler
- request logging

## Error handling organization

`src/shared/errors/` defines typed errors.
A single error middleware converts errors -> HTTP responses.
This prevents inconsistent error formatting across routes.

## Key folders

- `src/modules/registry/` — factual API registry
- `src/modules/community/` — reviews/upvotes/alternatives/history
- `src/modules/discovery/` — trending/complaints/recently deprecated aggregations
- `src/modules/auth/` — auth

No implementation has been added yet.
