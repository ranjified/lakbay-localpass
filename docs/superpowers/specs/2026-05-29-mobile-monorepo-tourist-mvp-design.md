# Mobile Monorepo Tourist MVP Design

## Goal

Build Lakbay LocalPass as a full product foundation instead of a web-only demo by converting the repository into a monorepo and adding a real Expo React Native Tourist MVP.

The mobile app focuses on the visitor journey first: discover Tayabas, save places, scan QR stories, earn LocalPass points, submit local service inquiries, and track trip activity.

## Architecture

The repo will move to a first-class app/package layout:

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
    mobile/
      app/
      components/
      features/
      assets/
      app.json
      package.json
  packages/
    shared/
      src/
        constants/
        mock-data/
        permissions/
        product/
        types/
  supabase/
  docs/
  package.json
  tsconfig.base.json
```

The existing Next.js app becomes `apps/web`. The Expo app lives in `apps/mobile`. Shared domain types, role constants, permissions, product copy, and demo data move into `packages/shared`.

This keeps web and mobile independent at runtime while letting both apps share the same product model.

## Mobile MVP Scope

The first Expo app is tourist-only. Provider, merchant, tourism staff, and admin mobile workflows are intentionally out of scope for this slice.

The app has five primary tabs:

- `Home`: visitor dashboard with featured route, quick actions, saved trip summary, LocalPass points, and highlighted destinations.
- `Explore`: destination browsing with category filters, story previews, points, tags, and save-to-trip action.
- `Scan`: QR check-in flow with camera-ready structure and a manual demo QR fallback. A successful check-in awards points and unlocks the destination story.
- `Requests`: inquiry center for food/pasalubong, stays, rides, and tours. Each form submits to local state first and shows a confirmation/status timeline.
- `Pass`: LocalPass wallet with points, badges, saved coupons, check-in history, and saved itinerary items.

## Data Flow

The first implementation uses local state and shared demo data from `packages/shared`.

Feature modules inside `apps/mobile/features` will wrap the data access so Supabase can replace mock data later:

```txt
apps/mobile/features/
  destinations/
  localpass/
  requests/
  profile/
```

The intended future data flow is:

1. UI calls feature-level hooks or actions.
2. Feature module reads or writes through a repository/query layer.
3. Repository talks to Supabase.
4. Supabase RLS enforces the same permissions described in `lib/permissions` and the shared package.

For the MVP, step 3 is mocked with local state and shared seed data.

## Components

The mobile app should use small focused components:

- App shell and tab navigation through Expo Router.
- Reusable cards for destinations, requests, badges, coupons, and status steps.
- Screen-level components that compose feature components instead of holding all UI in one file.
- Shared styling constants for colors, spacing, radius, and typography.

The visual direction should feel like a real tourism utility: warm, local, clean, mobile-native, and action-oriented. It should avoid a marketing landing page feel. The first screen should be the actual tourist app.

## Error Handling

The mobile app should handle:

- Empty saved trip state.
- QR code not recognized.
- Duplicate QR check-in.
- Missing form fields.
- Camera unavailable or not yet implemented by falling back to manual demo QR entry.

Errors should be shown inline and recoverably, never as dead-end alerts only.

## Testing And Verification

The first implementation should verify:

- Root monorepo scripts can run web and mobile commands.
- TypeScript compiles for shared package and web app.
- Existing Next.js build still passes after the move to `apps/web`.
- Expo project installs and starts without configuration errors.
- Mobile Tourist MVP screens render through Expo.
- Core local workflows work: save destination, check in, add points, submit request, view request status.

## Out Of Scope

- App Store or Play Store build setup.
- Push notifications.
- Native map SDK integration.
- Real Supabase Auth login on mobile.
- Provider, merchant, tourism staff, and admin mobile dashboards.
- Payments, delivery logistics, and real ride dispatch.

## Implementation Notes

Use Expo with TypeScript and Expo Router. Prefer local app state for the first slice and structure the feature modules so Supabase integration can land later without changing screen contracts.

Use the existing web app behavior as product reference, but do not simply wrap the web demo. The mobile app should be a native tourist experience with native navigation, mobile forms, and QR-first LocalPass flow.
