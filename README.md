# Doctor

A React + TypeScript + Vite single-page app with token-based authentication
(register, login, and protected routes). It talks to a backend REST API for
auth and stores the auth token on the client.

## Tech stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) (dev server + build)
- [React Router](https://reactrouter.com/) for routing
- [ESLint](https://eslint.org/) for linting

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (Node 20+ recommended)
- npm (ships with Node)

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables. Copy the example file and adjust the API URL:

```bash
cp .env.example .env
```

`.env`:

```bash
# Base URL for the backend API. Defaults to "/api" when unset.
VITE_API_BASE_URL=http://localhost:8000/api
```

3. Start the dev server:

```bash
npm run dev
```

Vite prints a local URL (default <http://localhost:5173>). Open it in your browser.

## Available scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot module reloading. |
| `npm run build`   | Type-check (`tsc -b`) and build for production.      |
| `npm run preview` | Preview the production build locally.                |
| `npm run lint`    | Run ESLint over the project.                         |

## Building for production

```bash
npm run build
```

The optimized output is written to `dist/`. To preview the build locally:

```bash
npm run preview
```

## Configuration

| Variable            | Default | Description                                                                 |
| ------------------- | ------- | --------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | `/api`  | Base URL of the backend REST API the app calls for auth and other requests. |

The app expects the backend to expose these auth endpoints relative to
`VITE_API_BASE_URL`:

- `POST /auth/register` — create an account; returns `{ token, user }`
- `POST /auth/login` — sign in; returns `{ token, user }`
- `GET /auth/me` — fetch the current user (requires `Authorization: Bearer <token>`)

> **Note:** A running backend is required for authentication to work. Without it,
> register/login requests will fail.

## Project structure

```
src/
├── api/          # API client + typed endpoint helpers (auth, etc.)
├── components/   # Reusable components (e.g. ProtectedRoute)
├── context/      # React context providers (AuthContext)
├── lib/          # Low-level helpers (token storage)
├── pages/        # Route pages (Login, Register, Home)
├── types/        # Shared TypeScript types
├── App.tsx       # Route definitions
└── main.tsx      # App entry point
```

The `@` alias maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`),
so imports can be written as `@/api/client`, `@/pages/LoginPage`, etc.
