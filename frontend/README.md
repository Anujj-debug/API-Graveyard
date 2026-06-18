# API Graveyard - Frontend

The frontend for API Graveyard is a modern, responsive web application built with React (Vite), Tailwind CSS, Framer Motion, and React Router. It provides a premium UI for users to browse, review, and report on the health of various APIs.

## Routing Architecture

Routing is handled via `react-router-dom` in `src/app/routes/index.jsx`. The application utilizes a centralized `RootLayout` which persists the navigation bar and footer across pages.

### Public Routes
These pages are accessible to all visitors:

- **`/` (Home Page)**
  - Displays the Hero section, platform statistics, and a grid of Trending APIs.
- **`/apis` (Directory Page)**
  - A comprehensive, paginated directory of all tracked APIs. Includes real-time search, category filtering, and status filtering via a sticky glassmorphism control bar.
- **`/apis/:id` (Details Page)**
  - The core detail view for a specific API. Displays metadata, alternative APIs, and interactive tabs for submitting/viewing **Status Reports** and **Community Reviews**.
- **`/login` (Authentication)**
  - Standard user login flow.
- **`/register` (Authentication)**
  - Standard user registration flow.

### Protected Routes
These pages are wrapped in a `<ProtectedRoute>` component and require a valid, authenticated user session (JWT token).

- **`/submit-api` (Submit API Page)**
  - Allows authenticated users to contribute new APIs to the directory.
- **`/profile` (User Dashboard)**
  - A personalized dashboard showing the user's account details, contribution metrics (APIs submitted, reviews, reports), and a timeline of their recent activity.

### Catch-All Routes
- **`*` (Not Found)**
  - 404 Error page for invalid routes.

## Theming & Styling
The application uses **Tailwind CSS** with a robust CSS variable system (`index.css`) for theming. 
- Colors are semantically defined (`primary`, `secondary`, `muted`, `card`, `border`).
- **Dark Mode** is fully supported via the `next-themes` provider.
- Animations and transitions are powered by **Framer Motion**.

## Running the App
Make sure your backend is running, then start the Vite development server:
```bash
npm install
npm run dev
```
