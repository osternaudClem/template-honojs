# HonoJS start template

A modern starter template for building APIs with [Hono](https://hono.dev/) and [Prisma](https://www.prisma.io/) on Node.js. Includes authentication, testing, and developer tooling out of the box.

## Features

- **HonoJS**: Fast, minimal web framework for building APIs
- **Prisma ORM**: Type-safe database access (PostgreSQL)
- **Authentication**: Email/password auth via [better-auth](https://www.better-auth.com) (with Prisma adapter)
- **REST API**: Example `/test` CRUD endpoints (create, read, update, delete)
- **Validation**: Request validation using [zod](https://zod.dev/) and [@hono/zod-validator](https://github.com/honojs/zod-validator)
- **Sentry integration**: Optional error monitoring via Sentry/GlitchTip
- **Logger**: Pretty, timestamped logs
- **ESLint & Prettier**: Code linting and formatting
- **Seed & Reset scripts**: For database seeding and cleaning
- **Bruno API collection**: Example API requests for testing (see `bruno/`)

## Quick Start

```sh
pnpm install
pnpm run dev
```

App will be available at [http://localhost:3000](http://localhost:3000)

## Environment Variables

Set these in your `.env` file (see `.env-sample`):

| Variable             | Required | Description                                     |
| -------------------- | -------- | ----------------------------------------------- |
| `DATABASE_URL`       | Yes      | PostgreSQL connection string for Prisma         |
| `BETTER_AUTH_SECRET` | Yes      | Secret for better-auth session/token encryption |
| `GLITCHTIP_DSN`      | No       | Sentry/GlitchTip DSN for error monitoring       |
| `PORT`               | No       | Port to run the server (default: 3000)          |
| `NODE_ENV`           | No       | Node environment (default: development)         |

## API Endpoints

### Auth

- `POST /auth/*` and `GET /auth/*`: Authentication endpoints (handled by better-auth)

### Test CRUD

- `GET /test` — List all test items
- `GET /test/:id` — Get a single test item by ID
- `POST /test` — Create a new test item (`{ title: string, content?: string }`)
- `PATCH /test/:id` — Update a test item (at least one of `title` or `content`)
- `DELETE /test/:id` — Delete a test item

## Database

- Uses Prisma ORM with a PostgreSQL database
- See `prisma/schema.prisma` for models
- Run `pnpm run seed` to seed the database
- Run `pnpm run seed:clear` to clear auth-related tables

## Developer Tooling

- ESLint and Prettier for code quality
- Bruno collection for API testing (`bruno/` folder)

---

Feel free to fork and adapt for your own projects!
