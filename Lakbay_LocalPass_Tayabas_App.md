# Lakbay LocalPass: Tayabas Tourism Super App

A hyperlocal tourism platform for Tayabas that helps visitors discover heritage sites, food spots, pasalubong sellers, accommodations, tour guides, transport providers, and events through one web and mobile experience.

## One Line Pitch

Lakbay LocalPass is a Tayabas focused tourism super app that turns every visit into a guided, rewarding, and locally connected experience.

## Problem

Tourists visiting Tayabas often rely on scattered information from social media, search results, or word of mouth. Because of this, many visitors go only to popular locations and miss heritage stories, food spots, pasalubong sellers, local guides, small stays, and transport options.

Local MSMEs also have limited digital visibility, which means tourism spending is not evenly distributed across the local economy.

## Target Users

| User Type | Description | Main Need |
|---|---|---|
| Tourists and Visitors | Day visitors, balikbayans, students, families, barkada groups | Plan trips, discover spots, book or inquire, earn rewards |
| Local Food Sellers | Restaurants, cafes, carinderias, delicacy makers | Promote menu items, receive orders or inquiries |
| Pasalubong Sellers | Local product shops and makers | Showcase products, bundle offers, pickup or preorder |
| Transport Providers | Tricycle drivers, vans, local transport groups | Receive ride or pickup requests |
| Tour Guides | Local guides and heritage storytellers | Offer guided tours and packages |
| Accommodation Owners | Homestays, inns, resorts, farm stays, retreat houses | Receive booking inquiries |
| Event Organizers | Local event groups and tourism partners | Promote upcoming activities |
| City Tourism Office | LGU tourism personnel | Manage listings, QR stories, events, feedback, and visitor insights |
| System Admin | Platform maintainers | Manage users, approvals, content, analytics, and system settings |

## Proposed Solution

Lakbay LocalPass provides one digital gateway for exploring Tayabas. Visitors can open the app, view an interactive map, follow suggested itineraries, scan QR codes at heritage sites, discover food and pasalubong, request local rides or tours, browse verified stays, and collect points through the LocalPass rewards system.

For the MVP, ordering and booking will start as inquiry, reservation, and request forms before full payment, delivery, and real time dispatch are added.

## Core Features

| Feature | Description | MVP Version |
|---|---|---|
| Interactive Tourism Map | Map of heritage sites, churches, nature spots, food shops, pasalubong stores, stays, and transport points | Map with filters and detail pages |
| Suggested Itineraries | Curated routes such as heritage walk, food trip, family tour, pasalubong trail, and event day route | Static curated itineraries with estimated time |
| QR Heritage Storytelling | QR codes at selected sites unlock history, trivia, photos, reminders, and visitor tips | QR scan opens a public story page |
| Local Food Marketplace | Local meals, delicacies, bundles, pickup, preorder, and delivery request options | Inquiry and preorder forms |
| Pasalubong Marketplace | Local products, bundles, shop profiles, and pickup options | Product listing and inquiry form |
| Ride and Tour Request | Request tricycles, vans, terminal pickup, or guided tour packages | Request form routed to provider dashboard |
| Stay Tayabas Listings | Homestays, inns, small resorts, farm stays, and retreat houses | Accommodation directory with booking inquiry |
| LocalPass Rewards | QR check ins, points, badges, coupons, and event challenges | Mock points, QR check ins, badges |
| Merchant Dashboard | Manage business profile, products, coupons, orders, and inquiries | Listing management and inquiry status |
| Tourism Dashboard | Manage destinations, QR content, events, feedback, and analytics | Admin content management and visitor counters |
| AI Travel Assistant | Suggest routes, answer common tourism questions, and recommend local experiences | FAQ based assistant with curated data |

## Unique Value Proposition

Lakbay LocalPass is not a generic booking, ride, food, delivery, or map app. It is built specifically for Tayabas and connects tourism discovery with local spending.

It combines five functions in one local platform:

1. Digital tourism guide
2. Local food and pasalubong marketplace
3. Ride and tour request system
4. Accommodation directory
5. QR based rewards pass

## High Level Concept

Waze plus Klook plus local marketplace for Tayabas tourism.

## User Roles and Access

| Role | Can Access | Main Actions |
|---|---|---|
| Guest Visitor | Public landing page, map, destinations, QR stories, events | Browse, search, view details, scan QR |
| Registered Tourist | Tourist dashboard, LocalPass, itinerary builder, bookings | Save places, request rides, order food, book stays, earn points |
| Food Merchant | Merchant dashboard, menu manager, orders, promos | Add food items, accept inquiries, create promos |
| Pasalubong Merchant | Product dashboard, shop profile, orders, coupons | Add products, manage bundles, respond to orders |
| Transport Provider | Transport dashboard, ride requests, availability | Accept or reject ride requests, update status |
| Tour Guide | Guide dashboard, package manager, tour requests | Publish packages, respond to bookings |
| Accommodation Owner | Stay dashboard, room listings, booking requests | Manage listings, update availability, respond to inquiries |
| Tourism Staff | Tourism dashboard, destination manager, QR manager, events, feedback | Add attractions, approve content, view analytics |
| Super Admin | Full admin panel | Manage users, roles, approvals, settings, reports |

## Tourist App Flow

### Discover Tayabas

1. Visitor opens the web or mobile app.
2. App shows featured routes, top destinations, nearby food spots, events, and LocalPass challenges.
3. Visitor searches by category, distance, theme, or itinerary.
4. Visitor opens a destination page with photos, description, QR story, nearby sellers, transport options, and tips.

### Build an Itinerary

1. Tourist selects a route such as Heritage Walk, Food Trip, Family Day, or Pasalubong Trail.
2. App shows the route map, estimated duration, suggested stops, and recommended food or pasalubong stops.
3. Tourist saves the route to My Trip.
4. Tourist may request transport or a guide for the route.

### QR Heritage Story

1. Tourist scans QR code at a site.
2. App opens the story page.
3. Tourist reads history, trivia, visitor rules, and nearby recommendations.
4. Tourist earns LocalPass points and may unlock a badge.

### Food or Pasalubong Order

1. Tourist opens Food and Pasalubong section.
2. Tourist filters by item type, pickup, preorder, delivery request, or nearby shops.
3. Tourist selects item or bundle.
4. Tourist submits inquiry or preorder form.
5. Merchant receives request on dashboard.
6. Tourist receives status update such as pending, accepted, preparing, ready for pickup, completed, or cancelled.

### Ride Request

1. Tourist opens Transport section.
2. Tourist chooses pickup point, destination, date, time, passenger count, and preferred vehicle.
3. Request appears on provider dashboard.
4. Transport provider accepts or declines.
5. Tourist receives confirmation details.

### Stay Booking Inquiry

1. Tourist opens Stay Tayabas.
2. Tourist filters by stay type, location, capacity, and amenities.
3. Tourist opens stay profile.
4. Tourist submits booking inquiry.
5. Accommodation owner responds through dashboard.

## Web App Modules

| Module | Route Example | Purpose |
|---|---|---|
| Landing Page | `/` | Public introduction, featured experiences, CTA |
| Explore Map | `/explore` | Interactive map and filters |
| Destinations | `/destinations` | Attraction directory |
| Destination Detail | `/destinations/[id]` | Site details, story, tips, related merchants |
| Itineraries | `/itineraries` | Curated routes and trip plans |
| Food and Pasalubong | `/marketplace` | Food and local products |
| Product Detail | `/marketplace/[id]` | Item details and order inquiry |
| Ride and Tour | `/transport` | Local ride and guided tour requests |
| Stay Tayabas | `/stays` | Accommodation directory |
| Events | `/events` | Event calendar |
| LocalPass | `/localpass` | Points, badges, QR check ins |
| Tourist Dashboard | `/dashboard/tourist` | Saved trips, orders, requests, rewards |
| Merchant Dashboard | `/dashboard/merchant` | Listings, inquiries, promos |
| Provider Dashboard | `/dashboard/provider` | Ride, tour, or stay requests |
| Tourism Dashboard | `/dashboard/tourism` | Destinations, QR content, events, analytics |
| Admin Dashboard | `/admin` | Users, approvals, settings, reports |

## Mobile App Screens

| Screen | Purpose |
|---|---|
| Home | Featured destinations, routes, food, events, and LocalPass |
| Explore Map | Mobile map with filters and nearby recommendations |
| Scan QR | QR scanner for heritage stories and check ins |
| My Trip | Saved destinations, itinerary, bookings, and requests |
| Marketplace | Food, pasalubong, bundles, and shop listings |
| Ride Request | Local transport request form |
| Stay Tayabas | Accommodation listings and inquiry form |
| Rewards | Points, badges, coupons, and challenges |
| Profile | Account, preferences, history, and notifications |

## Recommended Tech Stack

| Layer | Technology |
|---|---|
| Web App | Next.js with TypeScript |
| Mobile App | Expo React Native |
| UI | Tailwind CSS for web, NativeWind for mobile |
| Backend | Supabase |
| Database | PostgreSQL through Supabase |
| Authentication | Supabase Auth |
| File Storage | Supabase Storage |
| Maps | Mapbox, Leaflet, or Google Maps depending on available keys |
| QR | QR code generation and scanning libraries |
| Hosting | Vercel for web |
| Repository | GitHub |
| Development | VS Code with Codex assistance |

## Suggested Monorepo Structure

```text
lakbay-localpass/
  apps/
    web/
      app/
      components/
      lib/
      public/
    mobile/
      app/
      components/
      lib/
      assets/
  packages/
    shared/
      types/
      constants/
      validators/
  supabase/
    migrations/
    seed.sql
    policies.sql
  docs/
    product.md
    database.md
    api.md
    validation.md
  README.md
```

## Core Database Tables

| Table | Purpose |
|---|---|
| `profiles` | User profile and role assignment |
| `destinations` | Heritage sites, nature spots, churches, landmarks |
| `destination_stories` | QR based stories, trivia, media, visitor tips |
| `qr_codes` | QR records connected to destinations, events, or rewards |
| `businesses` | Merchant, accommodation, guide, and transport profiles |
| `products` | Food, pasalubong, bundles, and service offers |
| `orders` | Food and pasalubong inquiry or preorder records |
| `transport_requests` | Ride or pickup requests |
| `tour_requests` | Guide and tour package requests |
| `stay_listings` | Accommodation listings |
| `stay_requests` | Booking inquiry records |
| `itineraries` | Curated routes |
| `itinerary_stops` | Ordered stops inside each route |
| `events` | Local events and tourism activities |
| `checkins` | QR based tourist check ins |
| `rewards` | Points, badges, coupons, and challenges |
| `feedback` | Ratings, comments, visitor insights |
| `notifications` | App notifications and status updates |

## Suggested Data Model Notes

### Profiles

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Same as auth user ID |
| `full_name` | Text | Display name |
| `role` | Text | tourist, merchant, provider, tourism_staff, admin |
| `mobile_number` | Text | Optional |
| `created_at` | Timestamp | Auto generated |

### Destinations

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `name` | Text | Destination name |
| `category` | Text | heritage, church, nature, food_area, event_place |
| `description` | Text | Public description |
| `latitude` | Numeric | Map location |
| `longitude` | Numeric | Map location |
| `address` | Text | Human readable location |
| `opening_hours` | Text | Optional |
| `image_url` | Text | Main image |
| `is_featured` | Boolean | Featured on homepage |
| `status` | Text | draft, pending, published, archived |

### Businesses

| Field | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `owner_id` | UUID | Linked to profiles |
| `business_name` | Text | Public name |
| `business_type` | Text | food, pasalubong, transport, tour_guide, accommodation |
| `description` | Text | Public description |
| `contact_number` | Text | Public or internal contact |
| `address` | Text | Business location |
| `latitude` | Numeric | Optional |
| `longitude` | Numeric | Optional |
| `status` | Text | pending, approved, suspended |

## API Style

| Action | Method | Endpoint |
|---|---|---|
| List destinations | GET | `/api/destinations` |
| Get destination | GET | `/api/destinations/:id` |
| Create booking inquiry | POST | `/api/stay-requests` |
| Create food or pasalubong order inquiry | POST | `/api/orders` |
| Create ride request | POST | `/api/transport-requests` |
| Submit feedback | POST | `/api/feedback` |
| QR check in | POST | `/api/checkins` |
| List tourist rewards | GET | `/api/localpass/rewards` |
| Merchant update order status | PATCH | `/api/orders/:id/status` |
| Admin approve business | PATCH | `/api/admin/businesses/:id/approve` |

## Permissions Summary

| Resource | Guest | Tourist | Merchant | Provider | Tourism Staff | Admin |
|---|---|---|---|---|---|---|
| View destinations | Yes | Yes | Yes | Yes | Yes | Yes |
| Scan QR stories | Yes | Yes | Yes | Yes | Yes | Yes |
| Earn rewards | No | Yes | No | No | No | Yes |
| Submit orders | No | Yes | No | No | No | Yes |
| Submit ride requests | No | Yes | No | No | No | Yes |
| Manage own listing | No | No | Yes | Yes | No | Yes |
| Manage destinations | No | No | No | No | Yes | Yes |
| Approve businesses | No | No | No | No | Yes | Yes |
| Manage all users | No | No | No | No | No | Yes |
| View analytics | No | No | Own only | Own only | Yes | Yes |

## MVP Scope

The first demo should focus on showing the platform’s value clearly, not on building every full production feature.

### MVP Must Have

1. Public landing page
2. Interactive destination map
3. Destination detail pages
4. Suggested itineraries
5. QR story page and QR check in simulation
6. Food and pasalubong listings
7. Order or inquiry request form
8. Ride or tour request form
9. Stay listing and booking inquiry form
10. Tourist dashboard
11. Merchant or provider dashboard
12. Tourism admin dashboard
13. Supabase authentication and role based routing
14. Seed demo data for Tayabas destinations, shops, stays, and services

### MVP Can Be Simulated

| Feature | Demo Approach |
|---|---|
| Payments | Use inquiry and reservation status only |
| Real time ride dispatch | Use request board and status updates |
| Delivery logistics | Use pickup or merchant confirmation |
| AI assistant | Use curated FAQ and mock recommendation rules |
| Full rewards redemption | Use mock coupons and points |
| Verified business onboarding | Use admin approval status |

## Demo User Accounts

| Role | Email | Password | Dashboard |
|---|---|---|---|
| Tourist | `tourist@lakbay.local` | `demo12345` | Tourist dashboard |
| Food Merchant | `food@lakbay.local` | `demo12345` | Merchant dashboard |
| Pasalubong Merchant | `pasalubong@lakbay.local` | `demo12345` | Merchant dashboard |
| Transport Provider | `transport@lakbay.local` | `demo12345` | Provider dashboard |
| Accommodation Owner | `stay@lakbay.local` | `demo12345` | Provider dashboard |
| Tourism Staff | `tourism@lakbay.local` | `demo12345` | Tourism dashboard |
| Admin | `admin@lakbay.local` | `demo12345` | Admin dashboard |

## Demo Storyline

### Scene 1: Tourist Discovery

A visitor opens Lakbay LocalPass and sees a Tayabas heritage route, nearby food spots, and featured pasalubong shops.

### Scene 2: Heritage QR Scan

The visitor scans a QR code at a heritage site and unlocks a story page, trivia, nearby recommendations, and LocalPass points.

### Scene 3: Local Spending

The visitor opens the marketplace, chooses a pasalubong bundle, and submits a preorder request.

### Scene 4: Mobility

The visitor requests a tricycle or van pickup for the next destination.

### Scene 5: Merchant Dashboard

The merchant receives the preorder request and marks it accepted.

### Scene 6: Tourism Dashboard

Tourism staff views visitor check ins, popular destinations, QR scans, feedback, and participating businesses.

## Key Metrics

| Metric | Why It Matters |
|---|---|
| Number of QR scans | Measures heritage engagement |
| Number of destination views | Shows which places attract interest |
| Number of itinerary saves | Measures planning usefulness |
| Number of merchant inquiries | Measures local economic activity |
| Number of ride or tour requests | Measures mobility demand |
| Number of stay inquiries | Measures accommodation demand |
| Number of active merchants | Measures MSME adoption |
| Visitor feedback rating | Measures tourist satisfaction |
| Repeat app usage | Measures product stickiness |

## Expected Impact

| Beneficiary | Impact |
|---|---|
| Tourists | Easier trip planning, better local discovery, more meaningful Tayabas experience |
| MSMEs | More visibility, more inquiries, more chances to earn from tourists |
| Transport Providers | More organized ride and tour requests |
| Accommodation Owners | Simple listing and inquiry channel |
| Tour Guides | Better promotion of local expertise and tour packages |
| Tourism Office | Improved destination promotion, feedback collection, and visitor activity data |
| Community | Wider tourism spending, stronger heritage appreciation, and stronger local branding |

## Validation Plan

| Group | Target Count | Method | Key Questions |
|---|---:|---|---|
| Tourists and visitors | 10 | Short survey and prototype test | What information do you usually need before or during a visit? |
| Local food and pasalubong businesses | 10 | Interview | Would you join a Tayabas focused tourism marketplace? |
| Transport providers and tour guides | 5 | Interview | Would ride and tour requests help you receive more bookings? |
| Accommodation owners | 3 | Interview | Would a simple local listing channel help you receive inquiries? |
| Tourism staff | 1 to 3 | Interview and dashboard walkthrough | What data and tools would help promote Tayabas better? |

## Validation Outputs to Collect

1. Most requested tourist information
2. Most under promoted places and businesses
3. Willingness of merchants to join
4. Preferred reward types
5. Feedback on QR heritage storytelling
6. Feedback on ordering, booking, and ride request flows
7. Usability issues from prototype testing
8. Features to include or remove from MVP

## Lean Canvas Draft

| Section | Content |
|---|---|
| Problem | Scattered tourism information, low visibility for local MSMEs, limited tools for tourism engagement and visitor insights |
| Customer Segments | Tourists, local food sellers, pasalubong sellers, transport providers, tour guides, accommodation owners, Tourism Office |
| Unique Value Proposition | One Tayabas focused tourism pass that connects discovery, stories, local spending, rides, stays, and rewards |
| Solution | Web and mobile app with map, itineraries, QR stories, marketplace, ride and tour requests, stay listings, rewards, and dashboards |
| Channels | QR codes at sites, LGU tourism pages, schools, hotels, restaurants, pasalubong shops, events, social media |
| Revenue Streams | Merchant listing plans, promoted listings, booking commissions, event promotions, LGU tourism partnership, sponsorships |
| Cost Structure | Hosting, maps, development, QR materials, content production, training, support, marketing |
| Key Metrics | QR scans, itinerary saves, merchant inquiries, ride requests, stay inquiries, active merchants, feedback ratings |
| Unfair Advantage | Hyperlocal Tayabas content, LGU tourism partnership potential, QR heritage network, local merchant onboarding |
| High Level Concept | Waze plus Klook plus local marketplace for Tayabas tourism |

## Visual Identity Suggestions

| Item | Direction |
|---|---|
| Brand Feel | Local, warm, heritage inspired, modern, trustworthy |
| Primary Colors | Earth tones, heritage brown, deep green, warm gold |
| Typography | Clean sans serif for app UI, classic accent font for heritage headings |
| Logo Idea | Map pin plus QR pass plus Tayabas landmark silhouette |
| Tone | Helpful, local, friendly, proud of Tayabas culture |

## Development Milestones

| Milestone | Output |
|---|---|
| 1. Product Setup | Repository, Next.js app, Expo app, Supabase project, environment variables |
| 2. Authentication | Login, signup, roles, protected dashboards |
| 3. Public Tourism Pages | Landing page, map, destinations, itinerary pages |
| 4. QR and LocalPass | QR story pages, check ins, points, badges |
| 5. Marketplace | Merchant profiles, food and pasalubong listings, inquiry flow |
| 6. Requests | Ride, tour, and stay inquiry forms with dashboards |
| 7. Admin Tools | Approvals, content manager, destination manager, analytics cards |
| 8. Demo Polish | Seed data, responsive design, sample accounts, final pitch walkthrough |

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MAP_PROVIDER=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_APP_URL=
```

## Acceptance Criteria for Demo

1. A guest can browse destinations, map, itineraries, marketplace, stays, and events.
2. A tourist can sign in, save an itinerary, scan a QR story, earn points, and submit an inquiry.
3. A merchant can sign in, manage listings, and update inquiry status.
4. A provider can sign in and view ride, tour, or stay requests.
5. Tourism staff can sign in, manage destinations, view QR stories, approve listings, and see analytics cards.
6. Admin can manage users and system wide data.
7. App is responsive on mobile and desktop.
8. Demo data is seeded and ready for walkthrough.

## Suggested GitHub Issues

| Issue | Description | Priority |
|---|---|---|
| Setup monorepo | Create apps, packages, shared types, base config | High |
| Setup Supabase | Auth, tables, seed data, RLS policies | High |
| Build landing page | Hero, features, routes, CTA | High |
| Build destination map | Map view, filters, destination cards | High |
| Build QR story flow | QR page, check in, points update | High |
| Build marketplace | Products, merchant cards, inquiry form | High |
| Build dashboards | Tourist, merchant, provider, tourism, admin | High |
| Add demo accounts | Seed accounts by role | High |
| Polish UI | Mobile responsive design and pitch ready screens | Medium |
| Add AI assistant mock | Curated recommendations and FAQs | Medium |

## Suggested Codex Prompt

```text
Build the MVP demo of Lakbay LocalPass: Tayabas Tourism Super App using Next.js, TypeScript, Tailwind CSS, Supabase, and a clean responsive UI.

Use this product scope:
1. Public landing page
2. Explore map with destination cards and category filters
3. Destination detail page with QR heritage story section
4. Suggested itineraries
5. Food and pasalubong marketplace with inquiry form
6. Ride and tour request form
7. Stay Tayabas accommodation listings with booking inquiry form
8. Tourist dashboard showing saved trips, requests, rewards, and QR check ins
9. Merchant dashboard showing listings and inquiries
10. Provider dashboard showing ride, tour, or stay requests
11. Tourism dashboard showing destinations, QR stories, events, feedback, and analytics cards
12. Admin dashboard for users, businesses, approvals, and system settings

Use Supabase for authentication, database, storage, and role based access. Create seed data for Tayabas destinations, food shops, pasalubong sellers, stays, transport providers, guides, events, QR stories, and demo users.

Make the demo pitch ready. It should be visually polished, easy to navigate, and must clearly show how tourists discover Tayabas and how local businesses receive inquiries.
```

## Submission Notes

The competition entry should include project overview, problem description, customer segments, proposed solution, key features, value proposition, expected impact, pitch video link, and one page Lean Canvas. The demo should emphasize problem solution fit, innovation, feasibility, impact, validation, and clear pitch delivery.

## License

For demo and competition use. Final licensing can be decided before public release.
