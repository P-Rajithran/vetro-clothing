# Backend (Express)

Quick notes to start the backend and verify API connectivity locally.

## Start instructions

1. Copy `.env.example` to `.env` and fill values (see variables below).
2. Install and start:
   - npm install
   - npm run dev (uses nodemon)
3. Confirm the server is listening:
   - Visit http://localhost:4000/ → should show `API Working`
   - Visit http://localhost:4000/api/product/list → should show JSON list of products

## Test script

There's a small test script you can run to verify connectivity and critical endpoints:

Run:

  node scripts/test_api.js

It uses `BACKEND_URL` or defaults to `http://localhost:4000`.

## Recommended .env entries (backend)

- PORT=4000 (optional)
- MONGODB_URI
- CLOUDINARY_API_KEY
- CLOUDINARY_SECRET_KEY
- CLOUDINARY_NAME
- JWT_SECRET
- ADMIN_EMAIL
- ADMIN_PASSWORD
- FRONTEND_URL (optional, e.g., http://localhost:5174)


