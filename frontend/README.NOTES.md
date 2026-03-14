Frontend notes: Backend connectivity

If the frontend loads images or data from your backend, define the backend base URL using env vars.

Recommended `.env` (example):

```
VITE_BACKEND_URL=http://localhost:4000
```

Start frontend:

- npm install
- npm run dev

If you see `ERR_CONNECTION_REFUSED`, check that the backend is running at the host/port above and matches `VITE_BACKEND_URL`.

You can test the backend from the backend folder with:

- cd backend
- npm run test-api

This will attempt several endpoints and print status codes.