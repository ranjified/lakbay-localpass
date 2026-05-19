# Build Notes

## MVP goal

The current project is designed to be pitch ready. It prioritizes a reliable clickable demo over full production complexity.

## What already works

| Area | Status |
| --- | --- |
| Next.js app | Ready |
| Tailwind layout | Ready |
| Mobile friendly screens | Ready |
| Role dashboard simulation | Ready |
| QR check in simulation | Ready |
| Destination directory | Ready |
| Map demo | Ready |
| Supabase SQL | Ready |
| Vercel deployment | Ready after import |

## How the demo proves the concept

The demo lets judges experience the core value of Lakbay LocalPass:

1. A tourist can discover Tayabas stops.
2. A tourist can check in with a QR code and earn points.
3. Local businesses have a dashboard concept for visibility and inquiries.
4. Tourism staff can manage content and approvals.
5. Admin can control roles and governance.

## Production upgrades

| Upgrade | Notes |
| --- | --- |
| Supabase Auth | Replace local role simulation with real email login |
| Live dashboard data | Use Supabase queries and server actions |
| QR scanning | Add camera scanner for mobile PWA or Capacitor app |
| Map provider | Add Leaflet, Mapbox, or Google Maps |
| Merchant forms | Add product, coupon, and booking inquiry CRUD |
| Storage | Add image upload for destinations and businesses |
| Notifications | Add email, SMS, or push integration |
