# Supabase Migration Map

The mobile MVP uses mock data and AsyncStorage. These tables describe the future Supabase-backed model.

## Public Content

- `destinations`
- `tourism_stories`
- `destination_categories`
- `badges`
- `coupons`
- `routes`
- `route_stops`
- `partners`
- `partner_listings`

Tourists can read public destinations, stories, coupons, routes, and partner listings.

## Tourist-Owned Activity

- `profiles`
- `localpass_checkins`
- `localpass_points`
- `user_badges`
- `user_coupons`
- `saved_trip_items`
- `service_requests`
- `request_status_events`
- `feedback`

Tourists can create their own saved trip items, check-ins, points, coupons, requests, and feedback. Tourists can read only their own activity and requests.

## Partner Operations

Merchants and providers can read and manage only their own listings and related requests.

Relevant tables:

- `partners`
- `partner_listings`
- `service_requests`
- `request_status_events`

## Tourism Staff

Tourism staff can manage verified destination content, QR stories, routes, events, and tourism analytics.

Relevant tables:

- `destinations`
- `tourism_stories`
- `routes`
- `route_stops`
- `analytics_events`
- `feedback`

## Admin

Admins can manage all records, roles, approvals, and audit trails.

Future RLS should mirror the shared permission constants so the web and mobile apps use the same role model as the database.
