# Town Drive Frontend

This is the frontend for the Town Drive car rental application, built with React and Vite.

## Tech Stack

- React
- Vite
- React Router
- react-hot-toast
- motion/react

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Main Files & Structure

- `index.html`: HTML entry point, mounts React app to `#root`.
- `src/main.jsx`: Main JS entry, sets up React root, router, context provider, and motion config.
- `src/App.jsx`: Main app component, sets up routes and layout.
- `src/context/AppContext.jsx`: Global context for user, authentication, car data, and app state.

## Routing & Pages

Routes are defined in `src/App.jsx`:

- `/` — Home page
- `/car-details/:id` — Car details page
- `/cars` — List of cars
- `/my-bookings` — User bookings
- `/owner` — Owner dashboard (with nested routes):
  - `/owner` — Dashboard
  - `/owner/add-car` — Add car
  - `/owner/manage-cars` — Manage cars
  - `/owner/manage-bookings` — Manage bookings

Navbar and Footer are shown on non-owner routes. Login modal is shown when triggered by context.

## Context & State

`src/context/AppContext.jsx` provides global state and functions:

- User authentication and role
- Car data fetching
- Booking dates
- Login modal control
- Currency and API base URL from environment variables

## Environment Variables

Set these in a `.env` file at the project root:

- `VITE_BASE_URL` — Backend API base URL
- `VITE_CURRENCY` — Currency symbol/code

## Notes

- Uses React Router for navigation
- API requests are made using Axios, with base URL from environment
- UI components and pages are organized under `src/components/` and `src/pages/`

---
