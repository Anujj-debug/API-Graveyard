# API Graveyard

A community-driven API registry that helps developers discover, review, and track APIs. Users can browse APIs, submit new entries, share reviews, report API status changes, and explore alternative services.

## Features

* Authentication & Authorization
* User Profiles
* Submit New APIs
* Browse APIs
* Search APIs
* Filter APIs by Category and Status
* Pagination
* API Details Page
* Community Reviews
* Status Reports
* Community Status Calculation
* API Alternatives

---

## Tech Stack

### Frontend

* React-Vite
* React Router
* TanStack Query
* Axios
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Sonner

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Zod Validation

---

## Project Structure

```bash
frontend/
├── src/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   └── router/

backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── api-registry/
│   │   ├── reviews/
│   │   ├── status-reports/
│   │   └── users/
│   ├── shared/
│   └── config/
│
└── scripts/
```

---

## Core Functionality

### API Registry

Users can:

* Browse APIs
* Search APIs
* Filter APIs
* View API details
* Discover alternative APIs

### Reviews

Users can:

* Submit reviews
* Rate APIs
* Share experiences

Each user can submit only one review per API.

### Status Reports

Users can report API status:

* Active
* Stable
* Unstable
* Deprecated
* Dead
* Maintenance
* Acquired
* Rate-Limited

The community status is calculated automatically based on submitted reports.

### Profiles

Each user profile displays:

* APIs submitted
* Reviews written
* Status reports submitted

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd API-Graveyard
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

## Future Improvements

* Detailed API pricing plans
* API comparison page
* Upvote / Downvote system
* Save favorite APIs
* API logo uploads
* OAuth authentication
* Admin moderation dashboard
* API uptime tracking
* Trending APIs algorithm improvements
* Advanced analytics dashboard

---

## License

This project is licensed under the MIT License.
