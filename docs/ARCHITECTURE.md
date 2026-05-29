# Lakbay LocalPass Architecture

Lakbay LocalPass uses a feature-sliced modular monolith.

## Runtime Shape

- Next.js App Router owns routing, layouts, server components, and server actions.
- Supabase owns authentication, Postgres data, storage-ready assets, and Row Level Security.
- Vercel hosts the web app and serverless route handlers.
- Client components are reserved for interactive flows such as request forms, dashboards, QR simulation, and maps.

## Code Boundaries

Feature modules live under `features/` and expose data, actions, components, and validators for one product area.

```txt
features/
  destinations/
  marketplace/
  stays/
  transport/
  tours/
  events/
  localpass/
  dashboard/
  services/
```

Routes in `app/` should import from feature modules instead of reaching into all-purpose data files. This keeps pages thin and lets each feature grow toward live Supabase queries without changing route code.

## Permission Model

Shared role checks live in `lib/permissions/`.

- Tourists create requests, check in, and earn rewards.
- Provider roles manage their own listings and requests.
- Tourism staff and admins can moderate content and access operational dashboards.
- Admins retain full system control.

Supabase RLS should enforce the same model at the database level.

## Data Direction

The demo currently re-exports seeded mock data through feature modules. As live Supabase work lands, replace each feature module's mock exports with query and mutation functions:

```txt
features/destinations/queries.ts
features/marketplace/actions.ts
features/localpass/actions.ts
```

Keep `service_requests` as the shared MVP workflow table for food orders, stay bookings, rides, tours, and event interest until the workflows diverge enough to justify separate tables.
