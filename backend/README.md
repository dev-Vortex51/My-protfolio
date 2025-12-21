# Portfolio Backend (Node.js + TypeScript)

Secure Express API for the portfolio frontend.

## Features

- Express (ESM) + TypeScript
- MongoDB via Mongoose
- JWT auth (access + refresh tokens, rotation)
- Validation with Zod
- Helmet, CORS, rate limiting, HPP, mongo sanitize
- Request ID, compression, central error handling

## Setup

1. Create env file:

   - Copy `.env.example` to `.env` and fill values

2. Install dependencies:

```bash
cd backend
npm install
```

3. Run dev server:

```bash
npm run dev
```

4. Build + start:

```bash
npm run build
npm start
```

## API

- `GET /api/health`
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`
- Projects: `GET /api/projects`, `POST /api/projects` (admin), `PUT /api/projects/:id` (admin), `DELETE /api/projects/:id` (admin)
- Contact: `POST /api/contact`, `GET /api/contact` (admin), `POST /api/contact/:id/read` (admin)
- Portfolio: `GET /api/portfolio`, `PUT /api/portfolio` (admin)
