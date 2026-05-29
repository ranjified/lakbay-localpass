# Lakbay LocalPass Mobile Monorepo Tourist MVP

## 1. Goal

Build Lakbay LocalPass as a full product foundation instead of a web only demo.

The repository must be converted into a monorepo with two apps:

1. A Next.js web app inside `apps/web`
2. A real Expo React Native mobile app inside `apps/mobile`

The first mobile implementation must focus on the tourist journey.

The tourist should be able to discover Tayabas, save places, scan QR stories, earn LocalPass points, submit local service inquiries, and track trip activity through a mobile native experience.

The mobile app must not simply wrap the web app. It should feel like a real visitor utility for Tayabas.

## 2. Product Context

Project name:

```txt
Lakbay LocalPass: Tayabas Tourism Super App
```

Category:

```txt
Tourism
Mobile App
Web Application
System Platform
AI or Data Solution ready
```

Problem being solved:

```txt
Tourists visiting Tayabas often rely on scattered information from social media, word of mouth, or search results. Many visitors only go to popular locations and miss heritage stories, local food spots, pasalubong sellers, small accommodations, tour guides, and transport services. Smaller businesses also have limited digital presence, so tourism spending is not evenly distributed across the local economy.
```

Primary users:

```txt
Tourists
Day visitors
Balikbayans
Students on educational tours
Families
Barkada groups
```

Secondary users for future phases:

```txt
Local restaurants
Carinderias
Pasalubong sellers
Cafes
Homestays
Inns
Small resorts
Tour guides
Tricycle operators
Van operators
Event organizers
City Tourism Office
```

## 3. Demo Success Story

The MVP must clearly support this demo journey:

```txt
A tourist opens the mobile app, sees a featured Tayabas route, browses destinations, saves three places, checks the saved trip summary, scans a demo QR code at a heritage destination, unlocks a local story, earns LocalPass points, submits a pasalubong inquiry, receives a request status timeline, claims a coupon, and sees the full activity inside the LocalPass wallet.
```

This journey is the main proof that the app is not only a visual prototype but a working product slice.

## 4. Repository Architecture

Target structure:

```txt
lakbay-localpass/
  apps/
    web/
      app/
      components/
      features/
      lib/
      public/
      next.config.mjs
      package.json
      tsconfig.json

    mobile/
      app/
        _layout.tsx
        (tabs)/
          _layout.tsx
          index.tsx
          explore.tsx
          scan.tsx
          requests.tsx
          pass.tsx
        destination/
          [id].tsx
        request/
          [id].tsx
      components/
      features/
        destinations/
        localpass/
        requests/
        profile/
      assets/
      constants/
      app.json
      package.json
      tsconfig.json

  packages/
    shared/
      src/
        constants/
        mock-data/
        permissions/
        product/
        types/
        index.ts
      package.json
      tsconfig.json

  supabase/
    migrations/
    seed/
    README.md

  docs/
    mobile-mvp.md
    validation-summary.md
    supabase-migration-map.md

  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
```

## 5. Tooling Requirements

Use:

```txt
Package manager: pnpm
Workspace system: pnpm workspaces
Shared package name: @lakbay/shared
Mobile framework: Expo with TypeScript
Mobile routing: Expo Router
Web framework: Existing Next.js app
Persistence for mobile MVP: AsyncStorage
State management for MVP: React state, context, and feature hooks
```

Root scripts required:

```json
{
  "scripts": {
    "dev:web": "pnpm --filter web dev",
    "dev:mobile": "pnpm --filter mobile start",
    "build:web": "pnpm --filter web build",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint"
  }
}
```

## 6. App Package Names

Use these package names:

```txt
apps/web package name: web
apps/mobile package name: mobile
packages/shared package name: @lakbay/shared
```

## 7. Mobile MVP Scope

The first Expo app is tourist only.

Included in this slice:

```txt
Tourist home dashboard
Destination browsing
Destination details
Save to trip
QR demo check in
QR story unlock
LocalPass points
Badges
Coupons
Check in history
Service inquiry forms
Request status timeline
Local persistent demo state
```

Not included in this slice:

```txt
Provider mobile dashboard
Merchant mobile dashboard
Tourism staff mobile dashboard
Admin mobile dashboard
Real payment flow
Real delivery logistics
Real ride dispatch
Real Supabase Auth login
Native map SDK
Push notifications
App Store build setup
Play Store build setup
```

## 8. Mobile Navigation

Use Expo Router.

Routes:

```txt
apps/mobile/app/_layout.tsx
apps/mobile/app/(tabs)/_layout.tsx
apps/mobile/app/(tabs)/index.tsx
apps/mobile/app/(tabs)/explore.tsx
apps/mobile/app/(tabs)/scan.tsx
apps/mobile/app/(tabs)/requests.tsx
apps/mobile/app/(tabs)/pass.tsx
apps/mobile/app/destination/[id].tsx
apps/mobile/app/request/[id].tsx
```

Primary tabs:

```txt
Home
Explore
Scan
Requests
Pass
```

The first screen must be the tourist app dashboard, not a marketing landing page.

## 9. Home Tab

Purpose:

```txt
Show the tourist what they can do next.
```

Required sections:

```txt
Greeting and trip status
LocalPass points summary
Featured Tayabas route
Quick actions
Saved trip preview
Highlighted destinations
Recent activity preview
```

Quick actions:

```txt
Scan QR
Explore places
Request food or pasalubong
Find a ride
View LocalPass
```

Empty state:

```txt
If the tourist has no saved destinations, show a friendly prompt to explore and save places.
```

## 10. Explore Tab

Purpose:

```txt
Allow tourists to browse and save Tayabas destinations.
```

Required features:

```txt
Destination list
Category filters
Story preview
Points value
Tags
Save to trip action
Saved state indicator
Destination detail navigation
```

Categories:

```txt
Heritage
Faith
Food
Nature
Pasalubong
Stay
Tour
Transport
Event
```

Destination card should show:

```txt
Name
Category
Short description
Location label
Points available
Tags
Saved or unsaved state
Story available indicator
```

Destination detail screen should show:

```txt
Hero section
Description
Story preview
Full story if unlocked
Points reward
QR code value
Nearby local suggestions
Save or remove from trip button
```

## 11. Scan Tab

Purpose:

```txt
Support QR based LocalPass check ins and heritage storytelling.
```

Required features:

```txt
Camera ready layout
Manual demo QR input
Recognized QR success state
Unrecognized QR error state
Duplicate check in state
Points awarded state
Unlocked story state
Check in history update
```

Manual demo QR fallback must work even if camera is not implemented.

Demo QR codes:

```txt
LLP:TAYABAS:BASILICA
LLP:TAYABAS:CASA_COMUNIDAD
LLP:TAYABAS:KAMAY_NI_HESUS
LLP:TAYABAS:CALLE_BUDIN
LLP:TAYABAS:MALAGONLONG
```

QR check in rules:

```txt
Recognized first check in awards points.
Duplicate check in gives no additional points.
Duplicate check in must show already visited state.
Unrecognized QR must show a recoverable inline error.
Successful check in unlocks the destination story.
Successful check in appears in Pass history.
```

## 12. Requests Tab

Purpose:

```txt
Allow tourists to submit local service inquiries without building full marketplace, payment, delivery, or dispatch systems yet.
```

Request types:

```txt
Food or pasalubong
Stay
Ride
Tour
```

Request form fields:

```txt
Food or pasalubong:
  Item or bundle
  Quantity
  Pickup date
  Pickup time
  Notes

Stay:
  Check in date
  Check out date
  Number of guests
  Preferred area
  Budget range
  Notes

Ride:
  Pickup point
  Destination
  Date
  Time
  Number of passengers
  Notes

Tour:
  Preferred route
  Date
  Group size
  Guide preference
  Notes
```

Validation rules:

```txt
Required fields must be checked before submission.
Missing fields must show inline errors.
Submission must not use dead end alerts only.
Successful submission must create a local request record.
Successful submission must show a confirmation screen or status card.
```

Request statuses:

```txt
Submitted
Received by local partner
In review
Ready for confirmation
Completed
```

For MVP:

```txt
The app may generate a demo timeline immediately after submission.
The app must store requests locally through AsyncStorage.
The app must show request history.
```

## 13. Pass Tab

Purpose:

```txt
Serve as the tourist LocalPass wallet.
```

Required sections:

```txt
Total points
Badge collection
Saved coupons
Check in history
Saved itinerary items
Request activity summary
```

Badge examples:

```txt
Heritage Walker
Local Flavor
First Check In
Pasalubong Explorer
Faith Trail Visitor
Tayabas Starter
```

Coupon examples:

```txt
5 percent off selected pasalubong bundle
Free local guide tip sheet
Cafe drink add on
Heritage route souvenir discount
Family tour inquiry priority
```

## 14. LocalPass Rules

Points:

```txt
First QR check in: 25 points
Save destination: 5 points once per destination
Submit food or pasalubong inquiry: 10 points once
Submit stay inquiry: 10 points once
Submit ride inquiry: 10 points once
Submit tour inquiry: 10 points once
Duplicate QR check in: 0 points
Duplicate save action: 0 points
```

Badge unlocking:

```txt
First Check In:
  Unlock after first successful QR check in

Heritage Walker:
  Unlock after 3 heritage destination check ins

Local Flavor:
  Unlock after saving or requesting a food or pasalubong item

Pasalubong Explorer:
  Unlock after submitting a pasalubong inquiry

Tayabas Starter:
  Unlock after saving 3 destinations

Faith Trail Visitor:
  Unlock after checking in at a faith based destination
```

Coupon unlocking:

```txt
Unlock first coupon after 50 points.
Unlock second coupon after 100 points.
Unlock route based coupon after completing 3 check ins.
```

## 15. Shared Package

The shared package must contain reusable product definitions for both web and mobile.

Required exports:

```txt
constants
mock data
permissions
product copy
types
```

Required TypeScript models:

```ts
export type UserRole =
  | "tourist"
  | "merchant"
  | "provider"
  | "tourism_staff"
  | "admin";

export type TourismCategory =
  | "heritage"
  | "faith"
  | "food"
  | "nature"
  | "pasalubong"
  | "stay"
  | "tour"
  | "transport"
  | "event";

export type Destination = {
  id: string;
  name: string;
  category: TourismCategory;
  description: string;
  story: string;
  locationLabel: string;
  tags: string[];
  points: number;
  qrCode?: string;
  imageKey?: string;
  featured?: boolean;
};

export type LocalPassCheckIn = {
  id: string;
  destinationId: string;
  qrCode: string;
  pointsAwarded: number;
  checkedInAt: string;
};

export type LocalPassBadge = {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
};

export type Coupon = {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  claimed: boolean;
};

export type RequestType =
  | "food_pasabay"
  | "stay"
  | "ride"
  | "tour";

export type RequestStatus =
  | "submitted"
  | "received"
  | "in_review"
  | "ready_for_confirmation"
  | "completed";

export type ServiceRequest = {
  id: string;
  type: RequestType;
  title: string;
  details: Record<string, string>;
  status: RequestStatus;
  createdAt: string;
  timeline: RequestStatusStep[];
};

export type RequestStatusStep = {
  status: RequestStatus;
  label: string;
  description: string;
  completed: boolean;
  timestamp?: string;
};

export type SavedTripItem = {
  destinationId: string;
  savedAt: string;
};
```

## 16. Shared Mock Data

Add demo data inside:

```txt
packages/shared/src/mock-data/
```

Required files:

```txt
destinations.ts
routes.ts
badges.ts
coupons.ts
requests.ts
qr-codes.ts
```

Minimum seed content:

```txt
At least 8 destinations
At least 4 food or pasalubong listings
At least 3 stay listings
At least 3 ride or tour options
At least 5 coupons
At least 6 badges
At least 5 demo QR codes
At least 2 suggested itineraries
```

Suggested destinations:

```txt
Minor Basilica of Saint Michael the Archangel
Casa Comunidad de Tayabas
Malagonlong Bridge
Calle Budin
Kamay ni Hesus pilgrimage route
Tayabas local pasalubong stop
Tayabas food trail stop
Local heritage walk route
```

## 17. Mobile Feature Modules

Feature modules must wrap data and actions so Supabase can replace mock data later.

Required modules:

```txt
apps/mobile/features/destinations/
apps/mobile/features/localpass/
apps/mobile/features/requests/
apps/mobile/features/profile/
```

Destination module:

```txt
Read destinations
Filter destinations
Get destination by id
Save destination
Remove saved destination
Check saved state
```

LocalPass module:

```txt
Read points
Read badges
Read coupons
Read check ins
Validate QR code
Create check in
Prevent duplicate check in
Award points
Unlock badge
Claim coupon
```

Requests module:

```txt
Create request
Validate request fields
Read request history
Read request by id
Generate status timeline
Update local request status for demo
```

Profile module:

```txt
Read demo tourist profile
Read saved trip summary
Read recent activity
```

## 18. Local Persistence

Use AsyncStorage for the mobile MVP.

Persist:

```txt
Saved destinations
Check ins
Points
Unlocked stories
Badges
Coupons
Service requests
Recent activity
```

Storage keys:

```txt
lakbay.savedDestinations
lakbay.checkIns
lakbay.points
lakbay.unlockedStories
lakbay.badges
lakbay.coupons
lakbay.requests
lakbay.activity
```

The app must still work with clean storage.

Clean storage behavior:

```txt
Show starter points as 0.
Show no saved places.
Show no requests.
Show default locked badges.
Show available destinations.
Show available QR demo options.
```

## 19. UI Direction

Visual feel:

```txt
Warm
Local
Clean
Mobile native
Action oriented
Tourism utility
Not a landing page
```

Use reusable styling constants:

```txt
colors
spacing
radius
typography
shadow
layout
```

Suggested color intent:

```txt
Warm background
Readable dark text
Heritage accent
Nature accent
Reward accent
Soft card surfaces
```

Do not hardcode visual values across many files. Put them in:

```txt
apps/mobile/constants/theme.ts
```

## 20. Required Components

Shared mobile components:

```txt
AppScreen
SectionHeader
DestinationCard
RouteCard
QuickActionCard
PointsCard
BadgeCard
CouponCard
RequestCard
StatusTimeline
EmptyState
InlineError
PrimaryButton
SecondaryButton
TagPill
```

Screen components should compose smaller components.

Avoid putting all UI and logic into one large file.

## 21. Error Handling

The app must handle:

```txt
Empty saved trip state
Empty request history
QR code not recognized
Duplicate QR check in
Missing form fields
Camera unavailable
AsyncStorage read failure
AsyncStorage write failure
Destination not found
Request not found
```

Error behavior:

```txt
Show inline messages.
Allow the user to recover.
Do not rely only on alerts.
Do not leave the user on a dead end screen.
Provide a clear next action.
```

## 22. Accessibility

Mobile screens must include:

```txt
Readable text sizes
Large tap targets
Clear button labels
High contrast text
No information that depends only on color
Keyboard friendly form behavior
Scrollable forms
Clear empty states
```

## 23. Privacy and Consent

For MVP:

```txt
No real login required
No exact personal data required
No real payment data
No real location tracking
No real dispatch
No real merchant transaction
```

Camera related copy:

```txt
Lakbay LocalPass uses QR scanning only to unlock Tayabas stories and record demo check ins. You can also use manual demo QR entry.
```

Request form copy:

```txt
This MVP creates demo inquiries only. No payment, dispatch, or confirmed booking is processed.
```

## 24. Supabase Future Data Flow

Intended future flow:

```txt
UI calls feature hooks or actions.
Feature module calls repository functions.
Repository reads or writes Supabase data.
Supabase Row Level Security enforces permissions.
Shared permission constants mirror database access rules.
```

For MVP:

```txt
Use mock data and local persistence.
Keep function contracts ready for future Supabase repositories.
```

## 25. Supabase Migration Map

Future tables:

```txt
profiles
destinations
tourism_stories
destination_categories
localpass_checkins
localpass_points
badges
user_badges
coupons
user_coupons
saved_trip_items
service_requests
request_status_events
partners
partner_listings
routes
route_stops
feedback
analytics_events
```

Future RLS idea:

```txt
Tourists can read public destinations, stories, coupons, routes, and partner listings.
Tourists can create their own saved trip items, check ins, points, coupons, requests, and feedback.
Tourists can read only their own activity and requests.
Merchants can read and manage only their own listings and related requests.
Tourism staff can read tourism analytics and manage verified destination content.
Admins can manage all records.
```

## 26. Product Metrics

Track locally for MVP:

```txt
Saved destinations
QR check ins
Points earned
Stories unlocked
Requests submitted
Coupons claimed
Badges unlocked
Most viewed destinations
Most requested service type
```

Use these metrics to support pitch claims about feasibility and impact.

## 27. Validation Documentation

Create:

```txt
docs/validation-summary.md
```

Include:

```txt
Tourist pain points
Merchant feedback
Tourism office insights
Prototype test findings
Most useful features
Concerns raised by users
Changes made after feedback
```

Suggested validation targets:

```txt
10 tourists or visitors
10 local businesses
5 transport providers or tour guides
3 accommodation owners
Tourism staff feedback
```

Prototype test tasks:

```txt
Find a heritage destination.
Save a destination.
Scan a demo QR.
Unlock a story.
Submit a food or pasalubong inquiry.
Check LocalPass points.
View request status.
Claim a coupon.
```

## 28. Lean Canvas Alignment

The MVP should support these Lean Canvas areas:

```txt
Problem:
  Scattered tourism information and weak local business visibility.

Solution:
  Mobile tourist guide, QR stories, LocalPass rewards, and service inquiries.

Key Metrics:
  Saves, scans, requests, points, coupons, badges, and story unlocks.

Unique Value Proposition:
  A Tayabas focused tourism pass that connects discovery, heritage, rewards, and local spending.

Unfair Advantage:
  Hyperlocal Tayabas content, LGU tourism alignment, QR heritage flow, and community partner network.

Channels:
  Tourism Office, QR signs, local businesses, social media, schools, events, and heritage sites.

Customer Segments:
  Tourists first, local MSMEs and tourism staff next.

Revenue Streams:
  Future featured listings, partner subscriptions, promoted coupons, booking commissions, tour package fees.

Cost Structure:
  Hosting, development, QR materials, content production, onboarding, support, and partner training.
```

## 29. Implementation Phases

Phase 1:

```txt
Move existing Next.js app into apps/web.
Create pnpm workspace.
Create packages/shared.
Move shared product constants and demo data.
Make existing web app build again.
```

Phase 2:

```txt
Create Expo app in apps/mobile.
Install Expo Router.
Create tab layout.
Create theme constants.
Create reusable UI components.
```

Phase 3:

```txt
Build Home tab.
Build Explore tab.
Build destination detail screen.
Add save to trip.
Persist saved places.
```

Phase 4:

```txt
Build Scan tab.
Add manual demo QR.
Add QR validation.
Add check in creation.
Add duplicate check in handling.
Add points and story unlocks.
```

Phase 5:

```txt
Build Requests tab.
Add four request forms.
Add validation.
Add local submission.
Add request history.
Add request detail timeline.
```

Phase 6:

```txt
Build Pass tab.
Show points, badges, coupons, check ins, saved trip, and recent activity.
Add badge unlock rules.
Add coupon unlock rules.
```

Phase 7:

```txt
Add docs.
Add validation summary file.
Add Supabase migration map.
Run type checks.
Run web build.
Verify Expo start.
```

## 30. Acceptance Criteria

Repository:

```txt
Root pnpm install works.
Root scripts exist.
Existing web app lives in apps/web.
Expo app lives in apps/mobile.
Shared types and mock data live in packages/shared.
Web app imports shared package where appropriate.
Mobile app imports shared package.
```

Web:

```txt
Existing Next.js build still passes.
Existing behavior is not broken by the monorepo move.
```

Mobile:

```txt
Expo starts without configuration errors.
Tabs render correctly.
Home screen is the first tourist app screen.
Explore displays destination data.
Destination detail screen works.
Save destination works.
Saved state persists.
Scan screen accepts demo QR codes.
Valid QR creates check in.
Duplicate QR shows duplicate state.
Invalid QR shows inline error.
Successful check in adds points.
Successful check in unlocks destination story.
Requests can be submitted.
Missing request fields show inline errors.
Request history displays submitted requests.
Pass screen shows points, badges, coupons, check ins, and saved trip.
```

Documentation:

```txt
docs/mobile-mvp.md exists.
docs/validation-summary.md exists.
docs/supabase-migration-map.md exists.
```

## 31. Verification Commands

Run from root:

```bash
pnpm install
pnpm typecheck
pnpm build:web
pnpm dev:mobile
```

Run web:

```bash
pnpm dev:web
```

Run mobile:

```bash
pnpm dev:mobile
```

## 32. Codex Instruction

Use this instruction when implementing:

```txt
Convert this repository into a pnpm monorepo with apps/web, apps/mobile, and packages/shared.

Move the existing Next.js app into apps/web without breaking its current build.

Create a new Expo React Native app with TypeScript and Expo Router inside apps/mobile.

Create packages/shared with shared constants, mock data, permissions, product copy, and TypeScript types for Lakbay LocalPass.

Build the first mobile MVP as a tourist only app with five tabs: Home, Explore, Scan, Requests, and Pass.

Use shared demo data from @lakbay/shared.

Use AsyncStorage for mobile persistence.

Implement save destination, QR demo check in, points, badges, coupons, service requests, and request status timeline.

Do not implement real Supabase Auth, real payments, real delivery logistics, real ride dispatch, push notifications, native map SDK, or app store setup yet.

Keep feature modules structured so Supabase repositories can replace mock data later.

Ensure root scripts can run web, mobile, typecheck, lint, and web build.

The finished app should demonstrate this journey: tourist opens the app, discovers a Tayabas route, saves places, scans a QR code, unlocks a story, earns points, submits a local inquiry, tracks request status, claims a coupon, and views activity in the LocalPass wallet.
```

## 33. Definition of Done

The implementation is done when:

```txt
The monorepo structure exists.
The web app still builds.
The mobile app starts through Expo.
All five tourist tabs render.
The main tourist journey works locally.
Shared types and demo data are used by the mobile app.
Local persistence works after app reload.
Errors are handled inline.
Docs are added.
The code is ready for future Supabase integration.
```
