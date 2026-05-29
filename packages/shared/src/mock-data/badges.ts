import type { LocalPassBadge } from "../types";

export const badges: LocalPassBadge[] = [
  {
    id: "first-check-in",
    name: "First Check-in",
    description: "Scan your first recognized Lakbay LocalPass QR code.",
    unlocked: false
  },
  {
    id: "heritage-walker",
    name: "Heritage Walker",
    description: "Check in at three heritage destinations.",
    unlocked: false
  },
  {
    id: "local-flavor",
    name: "Local Flavor",
    description: "Save or request a food or pasalubong experience.",
    unlocked: false
  },
  {
    id: "pasalubong-explorer",
    name: "Pasalubong Explorer",
    description: "Submit a food or pasalubong request.",
    unlocked: false
  },
  {
    id: "tayabas-starter",
    name: "Tayabas Starter",
    description: "Save at least three destinations to your trip.",
    unlocked: false
  },
  {
    id: "faith-trail-visitor",
    name: "Faith Trail Visitor",
    description: "Check in at a faith destination.",
    unlocked: false
  }
];
