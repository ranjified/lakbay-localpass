# Mobile Monorepo Tourist MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Lakbay LocalPass into a pnpm monorepo with `apps/web`, `apps/mobile`, and `packages/shared`, then build a tourist-only Expo MVP with discovery, QR check-ins, LocalPass points, requests, coupons, and persisted local activity.

**Architecture:** The existing Next.js app moves into `apps/web`. Shared product types, mock data, reward rules, request validation, and permissions live in `packages/shared` and are imported by mobile first, then web where safe. The Expo app uses Expo Router, AsyncStorage-backed context, feature modules, and small reusable mobile components.

**Tech Stack:** pnpm workspaces, Next.js 15, Expo React Native, Expo Router, TypeScript, AsyncStorage, Vitest for shared/mobile feature logic, existing Tailwind CSS for web.

---

## File Structure Map

- Move existing web app files into `apps/web/`: `app/`, `components/`, `features/`, `lib/`, `public/`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `next-env.d.ts`, and web `tsconfig.json`.
- Modify root `package.json`: workspace scripts only.
- Create `pnpm-workspace.yaml`: registers `apps/*` and `packages/*`.
- Create `tsconfig.base.json`: shared TS options and path conventions.
- Create `apps/web/package.json`: existing Next.js dependencies and scripts.
- Create `packages/shared/`: typed product contract, mock data, permissions, LocalPass rules, request validation.
- Create `apps/mobile/`: Expo Router app, feature modules, reusable components, theme, persistence provider.
- Create docs: `docs/mobile-mvp.md`, `docs/validation-summary.md`, `docs/supabase-migration-map.md`.

---

### Task 1: Convert Root To pnpm Workspace

**Files:**
- Modify: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `tsconfig.base.json`
- Move: root web files into `apps/web/`
- Create: `apps/web/package.json`
- Modify: `apps/web/tailwind.config.ts`
- Modify: `apps/web/tsconfig.json`

- [ ] **Step 1: Move web-owned files**

Run:

```powershell
New-Item -ItemType Directory -Force -Path apps\web | Out-Null
Move-Item -LiteralPath app,components,features,lib,public -Destination apps\web
Move-Item -LiteralPath next.config.mjs,next-env.d.ts,postcss.config.mjs,tailwind.config.ts,tsconfig.json -Destination apps\web
```

Expected: `apps/web/app/layout.tsx`, `apps/web/components/navigation.tsx`, and `apps/web/features/dashboard/data.ts` exist.

- [ ] **Step 2: Write root `package.json`**

Replace root `package.json` with:

```json
{
  "name": "lakbay-localpass",
  "version": "0.1.0",
  "private": true,
  "description": "Lakbay LocalPass monorepo for web, mobile, and shared tourism platform packages.",
  "packageManager": "pnpm@9.15.4",
  "scripts": {
    "dev:web": "pnpm --filter web dev",
    "dev:mobile": "pnpm --filter mobile start",
    "build:web": "pnpm --filter web build",
    "typecheck": "pnpm -r typecheck",
    "lint": "pnpm -r lint"
  }
}
```

- [ ] **Step 3: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

- [ ] **Step 4: Create root `tsconfig.base.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@lakbay/shared": ["packages/shared/src/index.ts"],
      "@lakbay/shared/*": ["packages/shared/src/*"]
    }
  }
}
```

- [ ] **Step 5: Create `apps/web/package.json`**

```json
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@lakbay/shared": "workspace:*",
    "@supabase/supabase-js": "^2.49.4",
    "next": "^15.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.15.3",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.25.1",
    "eslint-config-next": "^15.3.1",
    "postcss": "^8.5.3",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}
```

- [ ] **Step 6: Update `apps/web/tsconfig.json`**

Keep Next settings, extend root base, and preserve `@/*` for the web app:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@lakbay/shared": ["../../packages/shared/src/index.ts"],
      "@lakbay/shared/*": ["../../packages/shared/src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 7: Update `apps/web/tailwind.config.ts` content paths**

Use:

```ts
content: [
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./features/**/*.{js,ts,jsx,tsx,mdx}",
  "./lib/**/*.{js,ts,jsx,tsx,mdx}"
]
```

- [ ] **Step 8: Verify web file move**

Run: `pnpm --filter web typecheck`

Expected before install: may fail if pnpm workspace dependencies are not installed. After Task 2 install, expected PASS.

- [ ] **Step 9: Commit**

```bash
git add package.json pnpm-workspace.yaml tsconfig.base.json apps/web
git commit -m "chore: move web app into pnpm workspace"
```

---

### Task 2: Create Shared Package With Tests First

**Files:**
- Create: `packages/shared/package.json`
- Create: `packages/shared/tsconfig.json`
- Create: `packages/shared/src/index.ts`
- Create: `packages/shared/src/types/index.ts`
- Create: `packages/shared/src/constants/index.ts`
- Create: `packages/shared/src/mock-data/*.ts`
- Create: `packages/shared/src/permissions/index.ts`
- Create: `packages/shared/src/product/index.ts`
- Create: `packages/shared/src/localpass/rules.ts`
- Create: `packages/shared/src/localpass/rules.test.ts`
- Create: `packages/shared/src/requests/validation.ts`
- Create: `packages/shared/src/requests/validation.test.ts`

- [ ] **Step 1: Create shared package manifest**

```json
{
  "name": "@lakbay/shared",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "lint": "tsc --noEmit",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Create shared `tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"]
}
```

- [ ] **Step 3: Write failing LocalPass rules tests**

Create `packages/shared/src/localpass/rules.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { calculateBadges, calculateUnlockedCoupons, getQrCheckInResult } from "./rules";
import { destinations } from "../mock-data/destinations";

describe("LocalPass rules", () => {
  it("awards 25 points for first recognized QR check in", () => {
    const result = getQrCheckInResult("LLP:TAYABAS:BASILICA", [], destinations);

    expect(result.status).toBe("recognized");
    expect(result.pointsAwarded).toBe(25);
    expect(result.destination?.id).toBe("basilica");
  });

  it("awards 0 points for duplicate QR check in", () => {
    const result = getQrCheckInResult(
      "LLP:TAYABAS:BASILICA",
      [{ id: "c1", destinationId: "basilica", qrCode: "LLP:TAYABAS:BASILICA", pointsAwarded: 25, checkedInAt: "2026-05-29T00:00:00.000Z" }],
      destinations
    );

    expect(result.status).toBe("duplicate");
    expect(result.pointsAwarded).toBe(0);
  });

  it("returns an invalid state for unknown QR codes", () => {
    const result = getQrCheckInResult("NOPE", [], destinations);

    expect(result.status).toBe("invalid");
    expect(result.pointsAwarded).toBe(0);
  });

  it("unlocks starter, check-in, and heritage badges from activity", () => {
    const badges = calculateBadges({
      savedDestinationIds: ["basilica", "casa-comunidad", "malagonlong-bridge"],
      checkIns: [
        { id: "c1", destinationId: "basilica", qrCode: "LLP:TAYABAS:BASILICA", pointsAwarded: 25, checkedInAt: "2026-05-29T00:00:00.000Z" },
        { id: "c2", destinationId: "casa-comunidad", qrCode: "LLP:TAYABAS:CASA_COMUNIDAD", pointsAwarded: 25, checkedInAt: "2026-05-29T00:01:00.000Z" },
        { id: "c3", destinationId: "malagonlong-bridge", qrCode: "LLP:TAYABAS:MALAGONLONG", pointsAwarded: 25, checkedInAt: "2026-05-29T00:02:00.000Z" }
      ],
      requests: []
    }, destinations);

    expect(badges.filter((badge) => badge.unlocked).map((badge) => badge.id)).toEqual(
      expect.arrayContaining(["first-check-in", "heritage-walker", "tayabas-starter"])
    );
  });

  it("unlocks coupons at 50 points, 100 points, and 3 check ins", () => {
    const coupons = calculateUnlockedCoupons(100, 3);

    expect(coupons.filter((coupon) => coupon.claimed).map((coupon) => coupon.id)).toEqual(
      expect.arrayContaining(["coupon-pasalubong-5", "coupon-guide-tip-sheet", "coupon-route-souvenir"])
    );
  });
});
```

- [ ] **Step 4: Run tests to verify RED**

Run: `pnpm --filter @lakbay/shared test`

Expected: FAIL because `rules.ts` and mock data exports do not exist.

- [ ] **Step 5: Implement shared types and mock data**

Create `packages/shared/src/types/index.ts` with the exact models from the spec plus supporting route/listing/activity types:

```ts
export type UserRole = "tourist" | "merchant" | "provider" | "tourism_staff" | "admin";
export type TourismCategory = "heritage" | "faith" | "food" | "nature" | "pasalubong" | "stay" | "tour" | "transport" | "event";

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

export type RequestType = "food_pasabay" | "stay" | "ride" | "tour";
export type RequestStatus = "submitted" | "received" | "in_review" | "ready_for_confirmation" | "completed";

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

export type SuggestedRoute = {
  id: string;
  title: string;
  description: string;
  stopIds: string[];
  estimatedDuration: string;
  tags: string[];
};

export type PartnerListing = {
  id: string;
  type: RequestType;
  title: string;
  description: string;
  locationLabel: string;
};

export type RecentActivity = {
  id: string;
  label: string;
  detail: string;
  createdAt: string;
};
```

Create seed files with at least the required counts. `destinations.ts` must include QR values:

```ts
import type { Destination } from "../types";

export const destinations: Destination[] = [
  { id: "basilica", name: "Minor Basilica of Saint Michael the Archangel", category: "faith", description: "A landmark church and anchor for a Tayabas heritage walk.", story: "The Basilica is one of Tayabas' strongest heritage anchors, connecting faith, civic history, and walkable local stops.", locationLabel: "Poblacion", tags: ["faith", "heritage", "walkable"], points: 25, qrCode: "LLP:TAYABAS:BASILICA", featured: true },
  { id: "casa-comunidad", name: "Casa Comunidad de Tayabas", category: "heritage", description: "A civic heritage structure for history and student tours.", story: "Casa Comunidad opens stories about old Tayabas civic life, public memory, and local preservation.", locationLabel: "Poblacion", tags: ["history", "students"], points: 25, qrCode: "LLP:TAYABAS:CASA_COMUNIDAD", featured: true },
  { id: "malagonlong-bridge", name: "Malagonlong Bridge", category: "heritage", description: "A historic stone bridge and photo stop for heritage routes.", story: "Malagonlong Bridge shows the engineering and route history that shaped movement around Tayabas.", locationLabel: "Tayabas heritage route", tags: ["bridge", "photo stop"], points: 25, qrCode: "LLP:TAYABAS:MALAGONLONG" },
  { id: "calle-budin", name: "Calle Budin", category: "pasalubong", description: "A local pasalubong stop centered on budin and delicacies.", story: "Calle Budin connects visitors to makers, pasalubong culture, and pickup-friendly local spending.", locationLabel: "City proper", tags: ["budin", "pasalubong"], points: 25, qrCode: "LLP:TAYABAS:CALLE_BUDIN" },
  { id: "kamay-ni-hesus-route", name: "Kamay ni Hesus Pilgrimage Route", category: "faith", description: "A faith-based route connector for pilgrim visitors.", story: "This route helps visitors connect nearby pilgrimage travel with Tayabas food, stories, and stays.", locationLabel: "Pilgrim route connector", tags: ["faith", "family"], points: 25, qrCode: "LLP:TAYABAS:KAMAY_NI_HESUS" },
  { id: "tayabas-food-trail", name: "Tayabas Food Trail Stop", category: "food", description: "A food discovery stop for local meals, snacks, and cafes.", story: "The food trail highlights small food sellers as part of the tourism experience.", locationLabel: "City food loop", tags: ["food", "local flavor"], points: 15, featured: true },
  { id: "local-pasalubong-stop", name: "Tayabas Local Pasalubong Stop", category: "pasalubong", description: "A pickup-friendly stop for bundles and local delicacies.", story: "Pasalubong stops help spread visitor spending to local makers.", locationLabel: "Poblacion pickup area", tags: ["shopping", "pickup"], points: 15 },
  { id: "heritage-walk-route", name: "Local Heritage Walk Route", category: "tour", description: "A suggested guided walk through key Tayabas stories.", story: "The route ties public spaces, faith sites, civic stories, and local snacks into one mobile journey.", locationLabel: "Poblacion loop", tags: ["tour", "walk"], points: 20 }
];
```

- [ ] **Step 6: Implement LocalPass rules**

Create `packages/shared/src/localpass/rules.ts`:

```ts
import { badges as baseBadges } from "../mock-data/badges";
import { coupons as baseCoupons } from "../mock-data/coupons";
import type { Coupon, Destination, LocalPassBadge, LocalPassCheckIn, ServiceRequest } from "../types";

export type QrCheckInResult =
  | { status: "recognized"; destination: Destination; pointsAwarded: 25 }
  | { status: "duplicate"; destination: Destination; pointsAwarded: 0 }
  | { status: "invalid"; destination?: undefined; pointsAwarded: 0 };

export function getQrCheckInResult(qrCode: string, checkIns: LocalPassCheckIn[], destinations: Destination[]): QrCheckInResult {
  const destination = destinations.find((item) => item.qrCode === qrCode);
  if (!destination) {
    return { status: "invalid", pointsAwarded: 0 };
  }

  const duplicate = checkIns.some((checkIn) => checkIn.destinationId === destination.id);
  if (duplicate) {
    return { status: "duplicate", destination, pointsAwarded: 0 };
  }

  return { status: "recognized", destination, pointsAwarded: 25 };
}

export function calculateBadges(
  state: { savedDestinationIds: string[]; checkIns: LocalPassCheckIn[]; requests: ServiceRequest[] },
  destinations: Destination[]
): LocalPassBadge[] {
  const checkedDestinations = state.checkIns
    .map((checkIn) => destinations.find((destination) => destination.id === checkIn.destinationId))
    .filter((destination): destination is Destination => Boolean(destination));
  const heritageCheckIns = checkedDestinations.filter((destination) => destination.category === "heritage").length;
  const faithCheckIns = checkedDestinations.filter((destination) => destination.category === "faith").length;
  const hasFoodOrPasalubongActivity =
    state.requests.some((request) => request.type === "food_pasabay") ||
    state.savedDestinationIds.some((id) => {
      const destination = destinations.find((item) => item.id === id);
      return destination?.category === "food" || destination?.category === "pasalubong";
    });

  const unlocked = new Set<string>();
  if (state.checkIns.length >= 1) unlocked.add("first-check-in");
  if (heritageCheckIns >= 3) unlocked.add("heritage-walker");
  if (hasFoodOrPasalubongActivity) unlocked.add("local-flavor");
  if (state.requests.some((request) => request.type === "food_pasabay")) unlocked.add("pasalubong-explorer");
  if (state.savedDestinationIds.length >= 3) unlocked.add("tayabas-starter");
  if (faithCheckIns >= 1) unlocked.add("faith-trail-visitor");

  return baseBadges.map((badge) => ({ ...badge, unlocked: unlocked.has(badge.id), unlockedAt: unlocked.has(badge.id) ? new Date().toISOString() : undefined }));
}

export function calculateUnlockedCoupons(points: number, checkInCount: number): Coupon[] {
  return baseCoupons.map((coupon, index) => ({
    ...coupon,
    claimed:
      (index === 0 && points >= 50) ||
      (index === 1 && points >= 100) ||
      (coupon.id === "coupon-route-souvenir" && checkInCount >= 3)
  }));
}
```

- [ ] **Step 7: Write failing request validation tests**

Create `packages/shared/src/requests/validation.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { generateRequestTimeline, validateRequestDetails } from "./validation";

describe("request validation", () => {
  it("reports missing required fields for a food or pasalubong request", () => {
    const result = validateRequestDetails("food_pasabay", { quantity: "2" });

    expect(result.valid).toBe(false);
    expect(result.errors).toMatchObject({
      itemOrBundle: "Item or bundle is required.",
      pickupDate: "Pickup date is required.",
      pickupTime: "Pickup time is required."
    });
  });

  it("accepts complete ride request details", () => {
    const result = validateRequestDetails("ride", {
      pickupPoint: "Tayabas Terminal",
      destination: "Basilica",
      date: "2026-06-08",
      time: "09:00",
      passengerCount: "3"
    });

    expect(result).toEqual({ valid: true, errors: {} });
  });

  it("generates a complete submitted request timeline", () => {
    const timeline = generateRequestTimeline("2026-05-29T00:00:00.000Z");

    expect(timeline).toHaveLength(5);
    expect(timeline[0]).toMatchObject({ status: "submitted", completed: true });
    expect(timeline[4]).toMatchObject({ status: "completed", completed: false });
  });
});
```

- [ ] **Step 8: Run request tests to verify RED**

Run: `pnpm --filter @lakbay/shared test`

Expected: FAIL because `requests/validation.ts` does not exist.

- [ ] **Step 9: Implement request validation**

Create `packages/shared/src/requests/validation.ts`:

```ts
import type { RequestStatusStep, RequestType } from "../types";

const requiredFields: Record<RequestType, Record<string, string>> = {
  food_pasabay: {
    itemOrBundle: "Item or bundle is required.",
    quantity: "Quantity is required.",
    pickupDate: "Pickup date is required.",
    pickupTime: "Pickup time is required."
  },
  stay: {
    checkInDate: "Check in date is required.",
    checkOutDate: "Check out date is required.",
    guestCount: "Number of guests is required.",
    preferredArea: "Preferred area is required.",
    budgetRange: "Budget range is required."
  },
  ride: {
    pickupPoint: "Pickup point is required.",
    destination: "Destination is required.",
    date: "Date is required.",
    time: "Time is required.",
    passengerCount: "Number of passengers is required."
  },
  tour: {
    preferredRoute: "Preferred route is required.",
    date: "Date is required.",
    groupSize: "Group size is required.",
    guidePreference: "Guide preference is required."
  }
};

export function validateRequestDetails(type: RequestType, details: Record<string, string>) {
  const errors: Record<string, string> = {};

  for (const [field, message] of Object.entries(requiredFields[type])) {
    if (!details[field]?.trim()) {
      errors[field] = message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function generateRequestTimeline(createdAt: string): RequestStatusStep[] {
  return [
    { status: "submitted", label: "Submitted", description: "Your demo inquiry was saved on this device.", completed: true, timestamp: createdAt },
    { status: "received", label: "Received by local partner", description: "A local partner receives this in the production workflow.", completed: false },
    { status: "in_review", label: "In review", description: "Details are checked before confirmation.", completed: false },
    { status: "ready_for_confirmation", label: "Ready for confirmation", description: "The partner can confirm schedule, price, and next steps.", completed: false },
    { status: "completed", label: "Completed", description: "The tourist marks the request complete after the visit.", completed: false }
  ];
}
```

- [ ] **Step 10: Add exports**

Create `packages/shared/src/index.ts`:

```ts
export * from "./constants";
export * from "./localpass/rules";
export * from "./mock-data/badges";
export * from "./mock-data/coupons";
export * from "./mock-data/destinations";
export * from "./mock-data/qr-codes";
export * from "./mock-data/requests";
export * from "./mock-data/routes";
export * from "./permissions";
export * from "./product";
export * from "./requests/validation";
export * from "./types";
```

- [ ] **Step 11: Run shared tests and typecheck**

Run:

```bash
pnpm --filter @lakbay/shared test
pnpm --filter @lakbay/shared typecheck
```

Expected: PASS.

- [ ] **Step 12: Commit**

```bash
git add packages/shared
git commit -m "feat: add shared product model and localpass rules"
```

---

### Task 3: Install Workspace Dependencies And Restore Web Build

**Files:**
- Modify: lockfile generated by pnpm
- Modify as needed: `apps/web/**/*` imports only if path resolution fails

- [ ] **Step 1: Install workspace dependencies**

Run: `pnpm install`

Expected: `pnpm-lock.yaml` is created and workspace packages install.

- [ ] **Step 2: Run web typecheck**

Run: `pnpm --filter web typecheck`

Expected: PASS.

- [ ] **Step 3: Run web build**

Run: `pnpm build:web`

Expected: Next.js build succeeds and prerenders existing routes.

- [ ] **Step 4: Commit**

```bash
git add pnpm-lock.yaml apps/web package.json pnpm-workspace.yaml tsconfig.base.json
git commit -m "chore: restore web build in workspace"
```

---

### Task 4: Scaffold Expo App Shell

**Files:**
- Create: `apps/mobile/package.json`
- Create: `apps/mobile/app.json`
- Create: `apps/mobile/babel.config.js`
- Create: `apps/mobile/tsconfig.json`
- Create: `apps/mobile/app/_layout.tsx`
- Create: `apps/mobile/app/(tabs)/_layout.tsx`
- Create: `apps/mobile/app/(tabs)/index.tsx`
- Create: `apps/mobile/app/(tabs)/explore.tsx`
- Create: `apps/mobile/app/(tabs)/scan.tsx`
- Create: `apps/mobile/app/(tabs)/requests.tsx`
- Create: `apps/mobile/app/(tabs)/pass.tsx`
- Create: `apps/mobile/constants/theme.ts`

- [ ] **Step 1: Create `apps/mobile/package.json`**

```json
{
  "name": "mobile",
  "version": "0.1.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit",
    "lint": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@lakbay/shared": "workspace:*",
    "@react-native-async-storage/async-storage": "^2.1.2",
    "expo": "^53.0.0",
    "expo-linking": "~7.1.5",
    "expo-router": "~5.0.7",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-native": "0.79.2",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.10.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.10",
    "typescript": "^5.8.3",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 2: Create Expo config**

`apps/mobile/app.json`:

```json
{
  "expo": {
    "name": "Lakbay LocalPass",
    "slug": "lakbay-localpass",
    "scheme": "lakbaylocalpass",
    "version": "0.1.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

`apps/mobile/babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"]
  };
};
```

- [ ] **Step 3: Create mobile `tsconfig.json`**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@lakbay/shared": ["../../packages/shared/src/index.ts"],
      "@lakbay/shared/*": ["../../packages/shared/src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

- [ ] **Step 4: Create theme constants**

Create `apps/mobile/constants/theme.ts`:

```ts
export const colors = {
  background: "#F7F1E4",
  surface: "#FFFCF4",
  text: "#123224",
  mutedText: "#5F7068",
  border: "#E6D8BE",
  heritage: "#416B5B",
  nature: "#2B6D4F",
  reward: "#F4A623",
  danger: "#A33B2F",
  white: "#FFFFFF"
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 8, md: 12, lg: 18, xl: 24 };
export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: "800" as const },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: "800" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  label: { fontSize: 12, lineHeight: 16, fontWeight: "700" as const }
};
export const shadow = {
  card: {
    shadowColor: "#123224",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  }
};
export const layout = { screenPadding: 18, tapTarget: 48 };
```

- [ ] **Step 5: Create tab shell**

Create `apps/mobile/app/_layout.tsx` and `apps/mobile/app/(tabs)/_layout.tsx` using Expo Router `Stack` and `Tabs`. Set `index` tab title to `Home`, then `Explore`, `Scan`, `Requests`, and `Pass`.

- [ ] **Step 6: Create route-verification tab screens**

Each tab screen should return an accessible `ScrollView` with the tab title and one sentence. This verifies routing before the full tab content is added in later tasks.

- [ ] **Step 7: Install dependencies**

Run: `pnpm install`

Expected: mobile dependencies added to `pnpm-lock.yaml`.

- [ ] **Step 8: Verify mobile typecheck**

Run: `pnpm --filter mobile typecheck`

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add apps/mobile pnpm-lock.yaml
git commit -m "feat: scaffold expo tourist app shell"
```

---

### Task 5: Build Mobile Persistence And Feature Logic With Tests

**Files:**
- Create: `apps/mobile/features/localpass/storage.ts`
- Create: `apps/mobile/features/localpass/localpass-context.tsx`
- Create: `apps/mobile/features/destinations/use-destinations.ts`
- Create: `apps/mobile/features/requests/use-requests.ts`
- Create: `apps/mobile/features/profile/use-profile.ts`
- Create: `apps/mobile/features/localpass/localpass-reducer.ts`
- Create: `apps/mobile/features/localpass/localpass-reducer.test.ts`

- [ ] **Step 1: Write failing reducer tests**

Create `apps/mobile/features/localpass/localpass-reducer.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { initialLocalPassState, localPassReducer } from "./localpass-reducer";

describe("mobile localpass reducer", () => {
  it("saves a destination once and awards 5 points", () => {
    const first = localPassReducer(initialLocalPassState, { type: "saveDestination", destinationId: "basilica", at: "2026-05-29T00:00:00.000Z" });
    const duplicate = localPassReducer(first, { type: "saveDestination", destinationId: "basilica", at: "2026-05-29T00:01:00.000Z" });

    expect(first.points).toBe(5);
    expect(first.savedDestinations).toHaveLength(1);
    expect(duplicate.points).toBe(5);
    expect(duplicate.savedDestinations).toHaveLength(1);
  });

  it("records a recognized check in and points", () => {
    const state = localPassReducer(initialLocalPassState, {
      type: "addCheckIn",
      checkIn: { id: "c1", destinationId: "basilica", qrCode: "LLP:TAYABAS:BASILICA", pointsAwarded: 25, checkedInAt: "2026-05-29T00:00:00.000Z" }
    });

    expect(state.points).toBe(25);
    expect(state.unlockedStoryIds).toContain("basilica");
    expect(state.checkIns).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run tests to verify RED**

Run: `pnpm --filter mobile test`

Expected: FAIL because `localpass-reducer.ts` does not exist.

- [ ] **Step 3: Implement reducer and storage keys**

Create pure reducer first so app behavior is testable without React Native. Include storage keys:

```ts
export const storageKeys = {
  savedDestinations: "lakbay.savedDestinations",
  checkIns: "lakbay.checkIns",
  points: "lakbay.points",
  unlockedStories: "lakbay.unlockedStories",
  badges: "lakbay.badges",
  coupons: "lakbay.coupons",
  requests: "lakbay.requests",
  activity: "lakbay.activity"
} as const;
```

`initialLocalPassState` must use clean storage defaults: 0 points, empty saved destinations, empty check-ins, empty requests, empty activity.

- [ ] **Step 4: Implement AsyncStorage adapter**

Create `apps/mobile/features/localpass/storage.ts` with `loadLocalPassState()` and `saveLocalPassState(state)`. Catch read/write failures and return `{ state, error }` or `{ ok, error }` so screens can show inline recoverable errors.

- [ ] **Step 5: Implement context provider and hooks**

Create `LocalPassProvider`, `useLocalPass`, `useDestinations`, `useRequests`, and `useProfile`. Hooks should wrap data/actions and hide storage details from screens.

- [ ] **Step 6: Run tests and typecheck**

Run:

```bash
pnpm --filter mobile test
pnpm --filter mobile typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add apps/mobile/features
git commit -m "feat: add mobile local persistence and feature hooks"
```

---

### Task 6: Add Reusable Mobile Components

**Files:**
- Create: `apps/mobile/components/AppScreen.tsx`
- Create: `apps/mobile/components/SectionHeader.tsx`
- Create: `apps/mobile/components/DestinationCard.tsx`
- Create: `apps/mobile/components/RouteCard.tsx`
- Create: `apps/mobile/components/QuickActionCard.tsx`
- Create: `apps/mobile/components/PointsCard.tsx`
- Create: `apps/mobile/components/BadgeCard.tsx`
- Create: `apps/mobile/components/CouponCard.tsx`
- Create: `apps/mobile/components/RequestCard.tsx`
- Create: `apps/mobile/components/StatusTimeline.tsx`
- Create: `apps/mobile/components/EmptyState.tsx`
- Create: `apps/mobile/components/InlineError.tsx`
- Create: `apps/mobile/components/PrimaryButton.tsx`
- Create: `apps/mobile/components/SecondaryButton.tsx`
- Create: `apps/mobile/components/TagPill.tsx`

- [ ] **Step 1: Build primitives**

Create `AppScreen`, `PrimaryButton`, `SecondaryButton`, `InlineError`, `EmptyState`, and `TagPill`. Use theme constants only for color/spacing/radius/typography. Buttons must have minimum height `layout.tapTarget`.

- [ ] **Step 2: Build cards**

Create destination, route, quick action, points, badge, coupon, request, and timeline components. Props should use types from `@lakbay/shared`.

- [ ] **Step 3: Verify typecheck**

Run: `pnpm --filter mobile typecheck`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/components
git commit -m "feat: add reusable mobile UI components"
```

---

### Task 7: Build Home And Explore Journey

**Files:**
- Modify: `apps/mobile/app/(tabs)/index.tsx`
- Modify: `apps/mobile/app/(tabs)/explore.tsx`
- Create: `apps/mobile/app/destination/[id].tsx`

- [ ] **Step 1: Build Home tab**

Compose:

- Greeting and trip status
- `PointsCard`
- Featured route from `suggestedRoutes[0]`
- Quick actions to `/scan`, `/explore`, `/requests`, and `/pass`
- Saved trip preview with empty state
- Highlighted destinations
- Recent activity preview

- [ ] **Step 2: Build Explore tab**

Add category filter chips for all `TourismCategory` values. Show `DestinationCard` for filtered destinations. Save button calls `saveDestination(destination.id)` and updates saved indicator.

- [ ] **Step 3: Build destination detail**

Use `useLocalSearchParams` to read `id`. Handle missing destination with `EmptyState`. Show hero, description, story preview, full story if unlocked, QR code value, nearby suggestions, and save/remove button.

- [ ] **Step 4: Verify**

Run: `pnpm --filter mobile typecheck`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/app apps/mobile/features/destinations
git commit -m "feat: build tourist home and explore flow"
```

---

### Task 8: Build Scan And LocalPass Rules UI

**Files:**
- Modify: `apps/mobile/app/(tabs)/scan.tsx`
- Modify: `apps/mobile/features/localpass/localpass-context.tsx`

- [ ] **Step 1: Build scan layout**

Show camera-ready panel with consent copy:

```txt
Lakbay LocalPass uses QR scanning only to unlock Tayabas stories and record demo check ins. You can also use manual demo QR entry.
```

Add manual QR input and quick demo QR buttons for the five QR codes from shared mock data.

- [ ] **Step 2: Implement submit behavior**

Use `getQrCheckInResult`. For recognized QR, create a check-in, award points, unlock story, update history, show success state. For duplicate QR, show already visited state and no points. For invalid QR, show inline error and keep input available.

- [ ] **Step 3: Verify duplicate and invalid states**

Manual: enter `NOPE`, then `LLP:TAYABAS:BASILICA`, then the same Basilica code again.

Expected: invalid inline error, success with 25 points, duplicate state with 0 points.

- [ ] **Step 4: Commit**

```bash
git add apps/mobile/app/\(tabs\)/scan.tsx apps/mobile/features/localpass
git commit -m "feat: add QR demo check in flow"
```

---

### Task 9: Build Requests Flow

**Files:**
- Modify: `apps/mobile/app/(tabs)/requests.tsx`
- Create: `apps/mobile/app/request/[id].tsx`
- Modify: `apps/mobile/features/requests/use-requests.ts`

- [ ] **Step 1: Build type selector and dynamic form**

Show four request types: food or pasalubong, stay, ride, tour. Render the required fields from the spec for the selected type.

- [ ] **Step 2: Wire validation**

On submit, call `validateRequestDetails`. Render `InlineError` below each missing field. Do not use alert-only errors.

- [ ] **Step 3: Create request record**

On valid submit, create `ServiceRequest` with generated id, title, details, `status: "submitted"`, `createdAt`, and `generateRequestTimeline(createdAt)`. Persist through AsyncStorage and add 10 points once per request type.

- [ ] **Step 4: Build request history and detail timeline**

Show `RequestCard` list on Requests tab. `apps/mobile/app/request/[id].tsx` shows full details and `StatusTimeline`. Missing request uses `EmptyState`.

- [ ] **Step 5: Verify**

Manual: submit empty food form, confirm inline errors, complete form, submit, open request detail.

Expected: request saved, timeline visible, points updated.

- [ ] **Step 6: Commit**

```bash
git add apps/mobile/app/\(tabs\)/requests.tsx apps/mobile/app/request apps/mobile/features/requests
git commit -m "feat: add tourist service request flow"
```

---

### Task 10: Build Pass Wallet

**Files:**
- Modify: `apps/mobile/app/(tabs)/pass.tsx`
- Modify: `apps/mobile/features/localpass/localpass-context.tsx`

- [ ] **Step 1: Build wallet sections**

Render:

- Total points
- Badge collection
- Saved coupons
- Check-in history
- Saved itinerary items
- Request activity summary

- [ ] **Step 2: Add badge and coupon calculation**

Call `calculateBadges` and `calculateUnlockedCoupons` from shared package whenever saved destinations, check-ins, requests, or points change.

- [ ] **Step 3: Add coupon claim behavior**

Unlocked coupons render as claimable. Claim action persists `claimed: true` and adds recent activity. Locked coupons show points required.

- [ ] **Step 4: Verify**

Manual: save three destinations, scan one QR, submit food request, inspect Pass tab.

Expected: points, saved places, check-in history, request summary, unlocked badges, and at least one coupon once points threshold is met.

- [ ] **Step 5: Commit**

```bash
git add apps/mobile/app/\(tabs\)/pass.tsx apps/mobile/features/localpass
git commit -m "feat: add localpass wallet"
```

---

### Task 11: Add Documentation

**Files:**
- Create: `docs/mobile-mvp.md`
- Create: `docs/validation-summary.md`
- Create: `docs/supabase-migration-map.md`
- Modify: `README.md`

- [ ] **Step 1: Create `docs/mobile-mvp.md`**

Document the tourist journey, tabs, QR demo codes, request types, LocalPass rules, and verification commands from the spec.

- [ ] **Step 2: Create `docs/validation-summary.md`**

Include headings for tourist pain points, merchant feedback, tourism office insights, prototype test findings, useful features, concerns, and changes after feedback. Seed it with the validation targets and prototype test tasks from the spec.

- [ ] **Step 3: Create `docs/supabase-migration-map.md`**

List future tables and RLS ideas from the spec, grouped by public content, tourist-owned activity, partner operations, tourism staff, and admin.

- [ ] **Step 4: Update README**

Update setup commands to use pnpm:

```bash
pnpm install
pnpm dev:web
pnpm dev:mobile
pnpm typecheck
pnpm build:web
```

- [ ] **Step 5: Commit**

```bash
git add README.md docs/mobile-mvp.md docs/validation-summary.md docs/supabase-migration-map.md
git commit -m "docs: add mobile mvp and supabase roadmap"
```

---

### Task 12: Final Verification

**Files:**
- Modify only files needed to fix verification failures.

- [ ] **Step 1: Run install**

Run: `pnpm install`

Expected: exits 0.

- [ ] **Step 2: Run all typechecks**

Run: `pnpm typecheck`

Expected: shared, web, and mobile typechecks pass.

- [ ] **Step 3: Run web build**

Run: `pnpm build:web`

Expected: Next.js production build passes.

- [ ] **Step 4: Start Expo**

Run: `pnpm dev:mobile`

Expected: Expo starts and prints local/QR development URLs without configuration errors.

- [ ] **Step 5: Manual mobile journey**

In Expo, verify:

1. Home is the first tourist dashboard.
2. Explore shows destinations.
3. Save three places.
4. Open a destination detail.
5. Scan or enter `LLP:TAYABAS:BASILICA`.
6. Confirm story unlock and points.
7. Enter duplicate QR and confirm duplicate state.
8. Submit a food or pasalubong inquiry.
9. Open request detail timeline.
10. Claim an unlocked coupon.
11. Open Pass and confirm saved places, check-in history, badges, coupons, requests, and activity.

- [ ] **Step 6: Commit final fixes**

```bash
git add .
git commit -m "chore: verify mobile tourist mvp"
```

---

## Self-Review Notes

- Spec coverage: Tasks cover repository move, pnpm workspace, shared package, Expo Router app, five tabs, AsyncStorage persistence, QR rules, request forms, wallet, docs, and verification.
- TDD coverage: Shared LocalPass rules, request validation, and mobile reducer are tested before implementation. UI routes are verified by typecheck and manual Expo flow because the repo does not yet have a React Native component test harness.
- Scope check: Provider, merchant, tourism staff, admin, payments, dispatch, push notifications, native map SDK, auth, and store setup remain out of scope.
