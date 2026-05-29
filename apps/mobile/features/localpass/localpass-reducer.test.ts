import { describe, expect, it } from "vitest";

import { initialLocalPassState, localPassReducer } from "./localpass-reducer";

describe("mobile localpass reducer", () => {
  it("saves a destination once and awards 5 points", () => {
    const first = localPassReducer(initialLocalPassState, {
      type: "saveDestination",
      destinationId: "basilica",
      at: "2026-05-29T00:00:00.000Z"
    });
    const duplicate = localPassReducer(first, {
      type: "saveDestination",
      destinationId: "basilica",
      at: "2026-05-29T00:01:00.000Z"
    });

    expect(first.points).toBe(5);
    expect(first.savedDestinations).toHaveLength(1);
    expect(duplicate.points).toBe(5);
    expect(duplicate.savedDestinations).toHaveLength(1);
  });

  it("records a recognized check in and points", () => {
    const state = localPassReducer(initialLocalPassState, {
      type: "addCheckIn",
      checkIn: {
        id: "c1",
        destinationId: "basilica",
        qrCode: "LLP:TAYABAS:BASILICA",
        pointsAwarded: 25,
        checkedInAt: "2026-05-29T00:00:00.000Z"
      }
    });

    expect(state.points).toBe(25);
    expect(state.unlockedStoryIds).toContain("basilica");
    expect(state.checkIns).toHaveLength(1);
  });

  it("awards request points once per request type", () => {
    const request = {
      id: "request-1",
      type: "food_pasabay" as const,
      title: "Budin pickup inquiry",
      details: { itemOrBundle: "Budin", quantity: "2" },
      status: "submitted" as const,
      createdAt: "2026-05-29T00:00:00.000Z",
      timeline: []
    };

    const first = localPassReducer(initialLocalPassState, { type: "createRequest", request });
    const second = localPassReducer(first, {
      type: "createRequest",
      request: { ...request, id: "request-2", createdAt: "2026-05-29T00:01:00.000Z" }
    });

    expect(first.points).toBe(10);
    expect(first.requests).toHaveLength(1);
    expect(second.points).toBe(10);
    expect(second.requests).toHaveLength(2);
  });
});
