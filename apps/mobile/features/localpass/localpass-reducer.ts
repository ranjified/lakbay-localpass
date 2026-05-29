import {
  REQUEST_POINTS,
  SAVE_DESTINATION_POINTS,
  badges,
  coupons,
  type Coupon,
  type LocalPassBadge,
  type LocalPassCheckIn,
  type RecentActivity,
  type SavedTripItem,
  type ServiceRequest
} from "@lakbay/shared";

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

export type LocalPassState = {
  savedDestinations: SavedTripItem[];
  checkIns: LocalPassCheckIn[];
  points: number;
  unlockedStoryIds: string[];
  badges: LocalPassBadge[];
  coupons: Coupon[];
  requests: ServiceRequest[];
  activity: RecentActivity[];
};

export type LocalPassAction =
  | { type: "hydrate"; state: LocalPassState }
  | { type: "saveDestination"; destinationId: string; at: string }
  | { type: "removeDestination"; destinationId: string }
  | { type: "addCheckIn"; checkIn: LocalPassCheckIn }
  | { type: "createRequest"; request: ServiceRequest }
  | { type: "claimCoupon"; couponId: string; at: string };

export const initialLocalPassState: LocalPassState = {
  savedDestinations: [],
  checkIns: [],
  points: 0,
  unlockedStoryIds: [],
  badges,
  coupons,
  requests: [],
  activity: []
};

export function localPassReducer(state: LocalPassState, action: LocalPassAction): LocalPassState {
  switch (action.type) {
    case "hydrate":
      return normalizeLocalPassState(action.state);
    case "saveDestination":
      return saveDestination(state, action.destinationId, action.at);
    case "removeDestination":
      return {
        ...state,
        savedDestinations: state.savedDestinations.filter((item) => item.destinationId !== action.destinationId)
      };
    case "addCheckIn":
      return addCheckIn(state, action.checkIn);
    case "createRequest":
      return createRequest(state, action.request);
    case "claimCoupon":
      return claimCoupon(state, action.couponId, action.at);
    default:
      return state;
  }
}

export function normalizeLocalPassState(state: Partial<LocalPassState> | null | undefined): LocalPassState {
  return {
    savedDestinations: Array.isArray(state?.savedDestinations) ? state.savedDestinations : [],
    checkIns: Array.isArray(state?.checkIns) ? state.checkIns : [],
    points: typeof state?.points === "number" ? state.points : 0,
    unlockedStoryIds: Array.isArray(state?.unlockedStoryIds) ? state.unlockedStoryIds : [],
    badges: Array.isArray(state?.badges) ? state.badges : badges,
    coupons: Array.isArray(state?.coupons) ? state.coupons : coupons,
    requests: Array.isArray(state?.requests) ? state.requests : [],
    activity: Array.isArray(state?.activity) ? state.activity : []
  };
}

function saveDestination(state: LocalPassState, destinationId: string, at: string): LocalPassState {
  if (state.savedDestinations.some((item) => item.destinationId === destinationId)) {
    return state;
  }

  return {
    ...state,
    savedDestinations: [...state.savedDestinations, { destinationId, savedAt: at }],
    points: state.points + SAVE_DESTINATION_POINTS,
    activity: [
      createActivity(`activity-save-${destinationId}-${at}`, "Saved destination", "Added a stop to your trip.", at),
      ...state.activity
    ]
  };
}

function addCheckIn(state: LocalPassState, checkIn: LocalPassCheckIn): LocalPassState {
  if (state.checkIns.some((item) => item.destinationId === checkIn.destinationId)) {
    return state;
  }

  return {
    ...state,
    checkIns: [...state.checkIns, checkIn],
    points: state.points + checkIn.pointsAwarded,
    unlockedStoryIds: appendOnce(state.unlockedStoryIds, checkIn.destinationId),
    activity: [
      createActivity(
        `activity-checkin-${checkIn.id}`,
        "Checked in",
        `Unlocked the story for ${checkIn.destinationId}.`,
        checkIn.checkedInAt
      ),
      ...state.activity
    ]
  };
}

function createRequest(state: LocalPassState, request: ServiceRequest): LocalPassState {
  const earnsPoints = !state.requests.some((item) => item.type === request.type);

  return {
    ...state,
    requests: [request, ...state.requests],
    points: state.points + (earnsPoints ? REQUEST_POINTS : 0),
    activity: [
      createActivity(`activity-request-${request.id}`, "Created request", request.title, request.createdAt),
      ...state.activity
    ]
  };
}

function claimCoupon(state: LocalPassState, couponId: string, at: string): LocalPassState {
  const coupon = state.coupons.find((item) => item.id === couponId);
  if (!coupon || coupon.claimed) {
    return state;
  }

  return {
    ...state,
    coupons: state.coupons.map((item) => (item.id === couponId ? { ...item, claimed: true } : item)),
    activity: [createActivity(`activity-coupon-${couponId}-${at}`, "Claimed coupon", coupon.title, at), ...state.activity]
  };
}

function appendOnce(values: string[], value: string): string[] {
  return values.includes(value) ? values : [...values, value];
}

function createActivity(id: string, label: string, detail: string, createdAt: string): RecentActivity {
  return { id, label, detail, createdAt };
}
