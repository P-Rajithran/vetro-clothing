# Vetro Clothing (monorepo)

This repo contains the frontend, admin and backend projects for the Vetro Clothing website.

## Quick start 🔧

### Backend
1. Copy `backend/.env.example` to `backend/.env` and set values (see environment variables below).
2. Install and run:
   - cd backend
   - npm install
   - npm run dev
3. Verify the server is running:
   - http://localhost:4000/ → should return `API Working`
   - http://localhost:4000/api/product/list → JSON products
   - http://localhost:4000/debug/static-products → server-rendered HTML with products
4. Run automated connectivity test (added):
   - npm run test-api (from the `backend` folder)

### Frontend
1. Create a `.env` or `.env.local` inside `frontend/` with:
   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```
2. Install and run:
   - cd frontend
   - npm install
   - npm run dev (Vite runs, default port 5174)

If images or API calls fail with `ERR_CONNECTION_REFUSED`, ensure the backend is running and `VITE_BACKEND_URL` matches the backend host/port.

---

## What I changed (summary) ✅
- Backend:
  - Serve uploaded files at `/images` and serve `public/` assets
  - Debug route fallback uses `FRONTEND_URL` for placeholder images
  - `app.listen(port, '0.0.0.0')` for broader local binding
  - Added `scripts/test_api.js` and `package.json` script `test-api`
- Frontend:
  - Components now prefix relative image paths with `VITE_BACKEND_URL` so images are requested from the backend (prevents requests to the frontend host when images reside on backend)

Files changed: `backend/server.js`, `backend/routes/debugRoute.js`, `backend/scripts/test_api.js`, `backend/package.json`, `frontend/src/components/ProductItem.jsx`, `frontend/src/pages/{Cart,Orders,Product}.jsx`.

---

## Environment variables — final checklist 📋

- Backend (`backend/.env`)
  - PORT (optional; default is 4000)
  - MONGODB_URI
  - CLOUDINARY_API_KEY
  - CLOUDINARY_SECRET_KEY
  - CLOUDINARY_NAME
  - JWT_SECRET
  - ADMIN_EMAIL
  - ADMIN_PASSWORD
  - FRONTEND_URL (optional; e.g., `http://localhost:5174`)

- Frontend (`frontend/.env` or `.env.local`)
  - VITE_BACKEND_URL=http://localhost:4000

Note: Vite only exposes environment variables that begin with `VITE_` to frontend code.

---

## Troubleshooting tips ⚠️
- If `npm run test-api` shows `ERR_CONNECTION_REFUSED`:
  - Ensure backend process is running (`npm run dev` in backend) and port matches `VITE_BACKEND_URL`.
  - Check if another process blocks the port: `netstat -ano | findstr :4000` on Windows.
  - Verify no firewall is blocking local requests.
- If images are missing: ensure product image entries are full URLs (Cloudinary) or the server has the local file in `backend/uploads` and is serving it at `/images/<filename>`.

---

If you'd like, I can also add the same summary to the admin README or create a small CI check to run `npm run test-api` on PRs.
