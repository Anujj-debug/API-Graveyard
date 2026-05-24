# Architecture

API Graveyard is organized to stay production-grade as features grow.

## Non-negotiable boundary: two layers

### 1) Core API Registry (factual, structured)
Owns canonical metadata about an API:
- name, description, category
- pricingType, status
- website, logoUrl (optional)
- provider/company

**Rule:** registry does not store community sentiment.

### 2) Community Contribution (opinionated, dynamic)
Owns user-generated sentiment and reputation signals:
- reviews/ratings with `issueType`
- painLevel (1–10)
- upvotes (toggle, one per user per API, no self-upvote)
- alternatives (references existing API IDs)
- history/timeline events

**Rule:** community entities reference APIs by API ID.

## Backend module strategy

- `src/modules/registry/*` — Registry routes + services + models
- `src/modules/community/*` — Community submodules (reviews, upvotes, alternatives, history)
- `src/modules/discovery/*` — Aggregations for home sections (trending, complaints, recently deprecated)
- `src/modules/auth/*` — JWT auth + session identity

Shared cross-cutting concerns:
- `src/shared/middlewares/*` — auth, validation, rate limiting, error handling
- `src/shared/errors/*` — typed errors and error mapping
- `src/shared/constants/*` — enums used across modules

## Frontend feature strategy

- `src/features/registry/*` — Registry UI/data
- `src/features/community/*` — Community UI/data (subfeatures)
- `src/features/auth/*` — Auth UI/data

Shared UI primitives:
- `src/components/ui/*`

## Why this scales

- Changes stay localized to a feature/module.
- Registry remains clean factual data (future: moderation/verification workflows).
- Community features evolve independently (new issue types, ranking logic, reputation algorithms).
