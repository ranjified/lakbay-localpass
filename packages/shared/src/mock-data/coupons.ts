import type { Coupon } from "../types";

export const coupons: Coupon[] = [
  {
    id: "coupon-pasalubong-5",
    title: "Pasalubong 5% perk",
    description: "Unlock a demo 5% pasalubong perk after earning 50 points.",
    pointsRequired: 50,
    claimed: false
  },
  {
    id: "coupon-guide-tip-sheet",
    title: "Local guide tip sheet",
    description: "Unlock a planning perk for your next guided route at 100 points.",
    pointsRequired: 100,
    claimed: false
  },
  {
    id: "coupon-route-souvenir",
    title: "Route souvenir stamp",
    description: "Unlock after three destination check-ins.",
    pointsRequired: 0,
    claimed: false
  },
  {
    id: "coupon-merienda-upgrade",
    title: "Merienda upgrade",
    description: "A demo snack upgrade for active LocalPass travelers.",
    pointsRequired: 150,
    claimed: false
  },
  {
    id: "coupon-stay-welcome",
    title: "Stay welcome note",
    description: "A demo welcome perk for future lodging requests.",
    pointsRequired: 200,
    claimed: false
  }
];
