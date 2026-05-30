# Mobile Tourist MVP

Lakbay LocalPass Mobile is an Expo React Native tourist app for Tayabas visitors. It is not a web wrapper; it is a native visitor utility for discovery, QR stories, rewards, and local service inquiries.

## Demo Journey

1. Open the app on the Home tab.
2. View the featured Tayabas route and LocalPass points.
3. Browse Explore and save three destinations.
4. Open a destination detail page.
5. Enter a demo QR code on Scan.
6. Unlock a story and earn LocalPass points.
7. Submit a food or pasalubong inquiry in Requests.
8. Open the request status timeline.
9. Claim an unlocked coupon in Pass.
10. Review saved places, check-ins, badges, coupons, requests, and recent activity.

## Tabs

- Home: trip dashboard, featured route, quick actions, saved trip preview, highlighted stops, recent activity.
- Explore: destination list, category filters, save state, story indicators, destination details.
- Scan: camera-ready layout, manual demo QR input, duplicate handling, story unlocks, check-in history.
- Requests: food/pasalubong, stay, ride, and tour inquiry forms with inline validation.
- Pass: points, badges, coupons, check-ins, saved itinerary, request summary, activity log.

## Demo QR Codes

```txt
LLP:TAYABAS:BASILICA
LLP:TAYABAS:CASA_COMUNIDAD
LLP:TAYABAS:KAMAY_NI_HESUS
LLP:TAYABAS:CALLE_BUDIN
LLP:TAYABAS:MALAGONLONG
```

## LocalPass Rules

- First QR check-in: 25 points.
- Save destination: 5 points once per destination.
- Submit each request type: 10 points once per type.
- Duplicate QR check-in: 0 points.
- Duplicate save: 0 points.

Badges unlock for first check-in, heritage check-ins, food/pasalubong activity, pasalubong inquiry, three saved destinations, and faith-route check-in.

Coupons unlock at 50 points, 100 points, and three check-ins for the route-based coupon.

## Commands

```bash
pnpm install
pnpm dev:mobile
pnpm typecheck
pnpm build:web
```
