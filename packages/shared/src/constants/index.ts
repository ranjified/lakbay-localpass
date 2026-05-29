import type { RequestType, TourismCategory } from "../types";

export const CHECK_IN_POINTS = 25;
export const SAVE_DESTINATION_POINTS = 5;
export const REQUEST_POINTS = 10;

export const tourismCategories: TourismCategory[] = [
  "heritage",
  "faith",
  "food",
  "nature",
  "pasalubong",
  "stay",
  "tour",
  "transport",
  "event"
];

export const requestTypeLabels: Record<RequestType, string> = {
  food_pasabay: "Food or pasalubong",
  stay: "Stay",
  ride: "Ride",
  tour: "Tour"
};
