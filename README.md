# Lakbay LocalPass

Lakbay LocalPass is a working demo for a Tayabas Tourism Super App. It shows a Vercel-ready web app, mobile-friendly PWA screens, role-based dashboards, QR check-in simulation, destination discovery, service booking flows, and Supabase database scripts.

## Expanded demo scope

This build includes:

1. Public landing page for the pitch
2. Destination directory with seeded Tayabas tourism stops
3. API-key-free map demo for easy Vercel deployment
4. LocalPass QR check-in simulation with browser-saved points
5. Dynamic dashboard for tourists, merchants, guides, transport providers, accommodation owners, event organizers, tourism staff, and system admin
6. Food and pasalubong ordering demo through Taste Trail
7. Stay booking demo through Stay Match
8. Vehicle request demo through Sakay Tayabas and Route Buddy
9. Tour guide booking demo through Kwentong Gabay
10. Event Trip Builder demo
11. Mobile/PWA preview for every user role
12. Supabase schema, seed data, and Row Level Security policies
13. PWA manifest for installable mobile browser demo

## Main demo pages

| Page | Purpose |
| --- | --- |
| `/` | Pitch-ready landing page |
| `/services` | Overview of all service modules and role access |
| `/food` | Tourist food/pasalubong order flow and merchant-side queue concept |
| `/stays` | Tourist stay booking flow and host-side confirmation concept |
| `/transport` | Tourist vehicle request flow and driver-side queue concept |
| `/tours` | Tour guide booking flow and story card concept |
| `/events` | Event Trip Builder for organizers and tourist itinerary saves |
| `/mobile` | Mobile/PWA role demo for every user type |
| `/dashboard` | Dynamic role dashboard |
| `/login` | Role simulation login |
| `/qr` | QR check-in and LocalPass points demo |
| `/map` | Tourism map demo |
| `/admin` | Admin dashboard view |

## User roles

| Role | Dashboard name | Unique module |
| --- | --- | --- |
| Tourist | My Lakbay Pass | Lakbay Mode |
| Merchant | Local Seller Counter | Tourism Boost Card |
| Tour Guide | Kwentong Gabay Desk | Story Cards |
| Transport Provider | Sakay Tayabas Board | Route Buddy |
| Accommodation Owner | Stay Tayabas Desk | Stay Match |
| Event Organizer | Tayabas Events Desk | Event Trip Builder |
| Tourism Staff | Tourism Command Center | Tourism Heat Pulse |
| Admin | Platform Control Room | Trust and Safety Queue |

## Tech stack

| Layer | Tool |
| --- | --- |
| Frontend | Next.js App Router |
| Styling | Tailwind CSS |
| Backend | Supabase Postgres |
| Auth-ready | Supabase Auth |
| Database security | Supabase Row Level Security |
| Hosting | Vercel |
| Version control | GitHub |

## Architecture

The project uses a feature-sliced modular monolith. Routes stay in `app/`, domain boundaries live in `features/`, shared infrastructure lives in `lib/`, and database scripts live in `supabase/`.

See `docs/ARCHITECTURE.md` for the code boundaries, permission model, and Supabase migration path.

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
2. Add the same Supabase environment variables in Vercel Project Settings once Supabase is ready.
3. Deploy.

The app still works without Supabase keys because the pitch demo uses local mock data. After Supabase is configured, the next development step is connecting live tables to the pages and replacing demo login with Supabase Auth.

## Clickable demo flows

| Flow | Tourist action | Provider/Admin action | Demo-only behavior |
| --- | --- | --- | --- |
| Taste Trail | Choose a shop/product, order mode, quantity, pickup time, and submit | Merchant sees pending, preparing, ready, and completed queue cards | Saves a sample food order to browser localStorage |
| Stay Tayabas | Pick accommodation, dates, guests, room request, and submit | Host inbox shows confirm, decline, and check-in instruction actions | Shows pending host confirmation without Supabase |
| Sakay Tayabas | Choose pickup, destination, passengers, vehicle package, and submit | Driver queue shows Accept, Arrived, and Completed actions | Shows pending driver acceptance without paid map or ride APIs |
| Kwentong Gabay | Pick guide package, date, group size, meeting point, and submit | Guide sees booking queue and story cards | Story cards cover Basilica, Casa Comunidad, Malagonlong Bridge, food trail, and festival narratives |
| Event Trip Builder | Save an event to itinerary | Organizer publishes schedule, venue, event QR, food, ride, and stay links | Connects event interest to local spending options |
| Mobile/PWA | Switch role screens | Each role previews mobile access and quick actions | Phone mockups use mock data only |

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
2. Read destinations, products, stays, vehicle packages, and service requests from Supabase instead of mock data.
3. Add create/update forms for merchant products, stay rooms, vehicle packages, and tour packages.
4. Add tourism staff content editor for QR stories.
5. Replace the static map demo with Leaflet or Mapbox.
6. Add camera-based QR scanning for the mobile PWA.
7. Add notification hooks for booking status changes.
