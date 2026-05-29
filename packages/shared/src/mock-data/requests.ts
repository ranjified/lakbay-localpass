import type { ServiceRequest } from "../types";

export const demoRequests: ServiceRequest[] = [
  {
    id: "request-demo-food",
    type: "food_pasabay",
    title: "Budin pickup inquiry",
    details: {
      itemOrBundle: "Budin bundle",
      quantity: "2",
      pickupDate: "2026-06-08",
      pickupTime: "10:00"
    },
    status: "submitted",
    createdAt: "2026-05-29T00:00:00.000Z",
    timeline: []
  }
];
