# Deployment Checklist

## GitHub

1. Confirm code is pushed to `main`.
2. Confirm `.env.local` and `.env` are ignored.
3. Confirm `README.md` is updated.

## Supabase

1. Create Supabase project.
2. Run `supabase/schema.sql`.
3. Run `supabase/seed.sql`.
4. Run `supabase/policies.sql`.
5. Copy Supabase URL and anon key.
6. Keep service role key private.

## Vercel

1. Import GitHub repo.
2. Framework should auto detect Next.js.
3. Add environment variables.
4. Deploy.
5. Test these routes:

```txt
/
/login
/dashboard
/admin
/destinations
/map
/qr
```

## Pitch demo flow

1. Open homepage.
2. Show map and destination directory.
3. Open QR page and check in using `LP-BASILICA-001`.
4. Open demo login.
5. Switch between tourist, merchant, tourism staff, and admin dashboards.
6. Explain how Supabase stores real users, listings, QR scans, points, inquiries, and approvals.
