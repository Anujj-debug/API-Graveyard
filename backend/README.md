# API Graveyard - Backend

The backend for API Graveyard is a robust RESTful API built with Node.js, Express, and MongoDB. It handles authentication, API registry management, user reviews, and status reports.

## Base URL
The API runs locally on port 5000 by default. All API routes are prefixed with `/api/v1`.

- **Health Check:** `GET /` -> Returns `{ message: "API Graveyard Backend Running" }`

---

## Authentication Routes
Handles user registration, login, and session verification.

- **`POST /api/v1/auth/register`**
  - **Description:** Creates a new user account.
  - **Body:** `{ username, email, password }`
- **`POST /api/v1/auth/login`**
  - **Description:** Authenticates a user and returns a JWT token.
  - **Body:** `{ email, password }`
- **`GET /api/v1/auth/me`** *(Protected)*
  - **Description:** Returns the currently authenticated user's profile based on their token.

---

## API Registry Routes
Manages the core directory of tracked APIs.

- **`GET /api/v1/apis`**
  - **Description:** Fetches a paginated list of APIs. Supports search and filtering via query parameters (`?search=...&category=...&status=...&page=1`).
- **`GET /api/v1/apis/trending`**
  - **Description:** Fetches a curated list of popular/trending APIs for the homepage.
- **`GET /api/v1/apis/:id`**
  - **Description:** Fetches full details for a specific API.
- **`POST /api/v1/apis`** *(Protected)*
  - **Description:** Submits a new API to the directory.
  - **Body:** API metadata (name, description, category, URLs, etc.).

---

## Reviews Routes
Nested under specific APIs to handle user-submitted reviews.

- **`GET /api/v1/apis/:id/reviews`**
  - **Description:** Fetches all reviews for the specified API.
- **`POST /api/v1/apis/:id/reviews`** *(Protected)*
  - **Description:** Submits a new review for the specified API.
  - **Body:** `{ rating, comment }`

---

## Status Reports Routes
Nested under specific APIs to handle user-reported downtime or issues.

- **`GET /api/v1/apis/:id/status-reports`**
  - **Description:** Fetches the recent status reports for the specified API.
- **`POST /api/v1/apis/:id/status-reports`** *(Protected)*
  - **Description:** Submits a new status report (e.g., API is Down, Degraded, or Operational).
  - **Body:** `{ status, details }`

---

## User Profile Routes
- **`GET /api/v1/users/:id/profile`**
  - **Description:** Fetches a public profile for a user, including their contribution counts (APIs submitted, reviews written, status reports) and recent activity timeline.

---

## Platform Statistics
- **`GET /api/v1/stats`**
  - **Description:** Returns high-level platform statistics for the homepage (total APIs tracked, total reviews, etc.).

---

## Running the Server
Ensure you have a `.env` file configured with your `MONGO_URI` and `JWT_SECRET`.
```bash
# Start development server
npm run dev

# Seed database with initial data
npm run seed
```
