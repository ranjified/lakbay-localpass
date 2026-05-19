export type UserRole =
  | "tourist"
  | "merchant"
  | "guide"
  | "transport"
  | "accommodation"
  | "event_organizer"
  | "tourism_staff"
  | "admin";

export type Destination = {
  id: string;
  name: string;
  category: "Heritage" | "Food" | "Nature" | "Religious" | "Pasalubong" | "Event";
  barangay: string;
  description: string;
  story: string;
  latitude: number;
  longitude: number;
  qrCode: string;
  points: number;
  tags: string[];
};

export type Business = {
  id: string;
  name: string;
  type: "Restaurant" | "Pasalubong" | "Cafe" | "Accommodation" | "Transport" | "Tour Guide";
  owner: string;
  barangay: string;
  status: "approved" | "pending" | "needs_review";
  engagement: number;
  offers: string[];
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  venue: string;
  description: string;
};

export type DashboardStat = {
  label: string;
  value: string;
  hint: string;
};

export type DashboardPanel = {
  title: string;
  items: string[];
};

export type RoleProfile = {
  role: UserRole;
  label: string;
  demoEmail: string;
  headline: string;
  summary: string;
  primaryActions: string[];
  stats: DashboardStat[];
  panels: DashboardPanel[];
};
