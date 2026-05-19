# Lakbay LocalPass

Lakbay LocalPass is a working demo for a Tayabas Tourism Super App. It shows a Vercel ready web app, mobile friendly PWA screens, role based dashboards, QR check in simulation, destination discovery, and Supabase database scripts.

## Demo scope

This initial build includes:

1. Public landing page for the pitch
2. Destination directory with seeded Tayabas tourism stops
3. API key free map demo for easy Vercel deployment
4. LocalPass QR check in simulation with browser saved points
5. Dynamic dashboard for tourists, merchants, guides, transport providers, accommodation owners, event organizers, tourism staff, and system admin
6. Supabase schema, seed data, and Row Level Security policies
7. PWA manifest for installable mobile browser demo

## Tech stack

| Layer | Tool |
| --- | --- |
| Frontend | Next.js App Router |
| Styling | Tailwind CSS |
| Backend | Supabase Postgres |
| Auth ready | Supabase Auth |
| Database security | Supabase Row Level Security |
| Hosting | Vercel |
| Version control | GitHub |

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Supabase setup

Create a Supabase project, open SQL Editor, then run these files in order:

```txt
supabase/schema.sql
supabase/seed.sql
supabase/policies.sql
```

Then copy your project keys into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Never commit `SUPABASE_SERVICE_ROLE_KEY`.

## Vercel deployment

1. Import this GitHub repo in Vercel.
2. Add the same Supabase environment variables in Vercel Project Settings.
3. Deploy.

The app also works without Supabase keys because the pitch demo uses local mock data. After Supabase is configured, the next development step is connecting live tables to the pages and replacing demo login with Supabase Auth.

## Demo accounts

| Role | Demo email |
| --- | --- |
| Tourist | tourist@lakbay.test |
| Merchant | merchant@lakbay.test |
| Tour Guide | guide@lakbay.test |
| Transport Provider | transport@lakbay.test |
| Accommodation Owner | stay@lakbay.test |
| Event Organizer | events@lakbay.test |
| Tourism Staff | tourism@lakbay.test |
| Admin | admin@lakbay.test |

## Recommended next tasks

1. Connect Supabase Auth to login.
2. Read destinations and businesses from Supabase instead of mock data.
3. Add merchant product management forms.
4. Add tourism staff content editor for QR stories.
5. Replace the static map demo with Leaflet or Mapbox.
6. Add camera based QR scanning for the mobile PWA.
