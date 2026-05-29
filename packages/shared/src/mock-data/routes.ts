import type { PartnerListing, SuggestedRoute } from "../types";

export const suggestedRoutes: SuggestedRoute[] = [
  {
    id: "route-heritage-faith",
    title: "Heritage and Faith Walk",
    description: "Start at the Basilica, continue to Casa Comunidad, then close with a bridge photo stop.",
    stopIds: ["basilica", "casa-comunidad", "malagonlong-bridge"],
    estimatedDuration: "3 hours",
    tags: ["heritage", "faith", "walkable"]
  },
  {
    id: "route-food-pasalubong",
    title: "Budin and Local Flavor Loop",
    description: "Pair the city food trail with Calle Budin and a local pasalubong pickup.",
    stopIds: ["tayabas-food-trail", "calle-budin", "local-pasalubong-stop"],
    estimatedDuration: "2 hours",
    tags: ["food", "pasalubong", "family"]
  }
];

export const partnerListings: PartnerListing[] = [
  {
    id: "food-budin-bundle",
    type: "food_pasabay",
    title: "Budin pasalubong bundle",
    description: "Reserve a pickup bundle from local sellers along Calle Budin.",
    locationLabel: "Calle Budin"
  },
  {
    id: "food-pancit-habang",
    type: "food_pasabay",
    title: "Pancit Habhab tray",
    description: "Coordinate a ready-to-share local meal for small groups.",
    locationLabel: "City food loop"
  },
  {
    id: "food-lucban-longganisa",
    type: "food_pasabay",
    title: "Longganisa and kakanin basket",
    description: "Bundle savory and sweet pasalubong for same-day pickup.",
    locationLabel: "Poblacion pickup area"
  },
  {
    id: "food-cafe-snacks",
    type: "food_pasabay",
    title: "Cafe merienda set",
    description: "Ask a local cafe to prepare snacks before the heritage walk.",
    locationLabel: "Poblacion"
  },
  {
    id: "stay-poblacion-inn",
    type: "stay",
    title: "Poblacion family inn",
    description: "Simple rooms near the heritage loop for overnight visitors.",
    locationLabel: "Poblacion"
  },
  {
    id: "stay-pilgrim-house",
    type: "stay",
    title: "Pilgrim guest house",
    description: "Budget-friendly rooms for faith-route travelers.",
    locationLabel: "Pilgrim route connector"
  },
  {
    id: "stay-farm-homestay",
    type: "stay",
    title: "Farm homestay",
    description: "A quiet stay option outside the city center.",
    locationLabel: "Tayabas countryside"
  },
  {
    id: "ride-terminal-transfer",
    type: "ride",
    title: "Terminal to Basilica transfer",
    description: "Coordinate a local ride from the terminal to your first stop.",
    locationLabel: "Tayabas Terminal"
  },
  {
    id: "ride-bridge-loop",
    type: "ride",
    title: "Malagonlong bridge loop ride",
    description: "Book a ride for bridge photos and nearby heritage stops.",
    locationLabel: "Heritage route"
  },
  {
    id: "tour-guided-walk",
    type: "tour",
    title: "Guided heritage walk",
    description: "Request a local guide for the Basilica, Casa Comunidad, and plaza.",
    locationLabel: "Poblacion loop"
  }
];
