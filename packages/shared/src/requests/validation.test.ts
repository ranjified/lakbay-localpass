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

  it("validates required fields for stay requests", () => {
    const result = validateRequestDetails("stay", {
      checkInDate: "2026-06-08",
      checkOutDate: "",
      guestCount: "2",
      preferredArea: "Poblacion",
      budgetRange: ""
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toMatchObject({
      checkOutDate: "Check out date is required.",
      budgetRange: "Budget range is required."
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

  it("validates required fields for tour requests", () => {
    const result = validateRequestDetails("tour", {
      preferredRoute: "Heritage Walk",
      date: "2026-06-08",
      groupSize: "",
      guidePreference: ""
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toMatchObject({
      groupSize: "Group size is required.",
      guidePreference: "Guide preference is required."
    });
  });

  it("generates a complete submitted request timeline", () => {
    const timeline = generateRequestTimeline("2026-05-29T00:00:00.000Z");

    expect(timeline).toHaveLength(5);
    expect(timeline[0]).toMatchObject({ status: "submitted", completed: true });
    expect(timeline.slice(1).every((step) => !step.completed)).toBe(true);
    expect(timeline[4]).toMatchObject({ status: "completed", completed: false });
  });
});
