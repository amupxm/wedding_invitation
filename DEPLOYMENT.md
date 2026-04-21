# Production Deployment

## 1) Build

From repo root:

```bash
npm install
npm run build
```

This creates:
- frontend bundle in `frontend/dist`
- backend build in `backend/dist`

## 2) Backend environment

Create `backend/.env` from `backend/.env.production.example` and set real values.

At minimum:
- `ADMIN_PASSWORD` must be a strong secret
- `CORS_ORIGIN` must match your domain(s)

## 3) Run backend

From repo root:

```bash
npm run start:backend
```

For production process management, run with `pm2` or `systemd`.

## 4) Nginx

Use `deploy/nginx/ratna.conf` as your site config and update:
- `server_name`
- `root` path

Then enable and reload Nginx.

## 5) Database reset

To reset invitations database to an empty list:

```bash
npm run reset:db
```

The command automatically creates a timestamped backup before reset.
