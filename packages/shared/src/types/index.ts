export type UserRole = "tourist" | "merchant" | "provider" | "tourism_staff" | "admin";

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
