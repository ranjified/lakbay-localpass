import { describe, expect, it } from "vitest";
import { calculateBadges, calculateUnlockedCoupons, getQrCheckInResult } from "./rules";
import { destinations } from "../mock-data/destinations";

describe("LocalPass rules", () => {
  it("awards 25 points for first recognized QR check in", () => {
    const result = getQrCheckInResult("LLP:TAYABAS:BASILICA", [], destinations);

    expect(result.status).toBe("recognized");
    expect(result.pointsAwarded).toBe(25);
    expect(result.destination?.id).toBe("basilica");
  });

  it("awards 0 points for duplicate QR check in", () => {
    const result = getQrCheckInResult(
      "LLP:TAYABAS:BASILICA",
      [
        {
          id: "c1",
          destinationId: "basilica",
          qrCode: "LLP:TAYABAS:BASILICA",
          pointsAwarded: 25,
          checkedInAt: "2026-05-29T00:00:00.000Z"
        }
      ],
      destinations
    );

    expect(result.status).toBe("duplicate");
    expect(result.pointsAwarded).toBe(0);
  });

  it("returns an invalid state for unknown QR codes", () => {
    const result = getQrCheckInResult("NOPE", [], destinations);

    expect(result.status).toBe("invalid");
    expect(result.pointsAwarded).toBe(0);
  });

  it("unlocks all six badge rules from activity", () => {
    const badges = calculateBadges(
      {
        savedDestinationIds: [
          "basilica",
          "casa-comunidad",
          "malagonlong-bridge",
          "calle-budin"
        ],
        checkIns: [
          {
            id: "c1",
            destinationId: "basilica",
            qrCode: "LLP:TAYABAS:BASILICA",
            pointsAwarded: 25,
            checkedInAt: "2026-05-29T00:00:00.000Z"
          },
          {
            id: "c2",
            destinationId: "casa-comunidad",
            qrCode: "LLP:TAYABAS:CASA_COMUNIDAD",
            pointsAwarded: 25,
            checkedInAt: "2026-05-29T00:01:00.000Z"
          },
          {
            id: "c3",
            destinationId: "malagonlong-bridge",
            qrCode: "LLP:TAYABAS:MALAGONLONG",
            pointsAwarded: 25,
            checkedInAt: "2026-05-29T00:02:00.000Z"
          },
          {
            id: "c4",
            destinationId: "tayabas-heritage-plaza",
            qrCode: "LLP:TAYABAS:PLAZA",
            pointsAwarded: 25,
            checkedInAt: "2026-05-29T00:03:00.000Z"
          }
        ],
        requests: [
          {
            id: "r1",
            type: "food_pasabay",
            title: "Budin pickup",
            details: {},
            status: "submitted",
            createdAt: "2026-05-29T00:04:00.000Z",
            timeline: []
          }
        ]
      },
      destinations
    );

    expect(badges.filter((badge) => badge.unlocked).map((badge) => badge.id)).toEqual(
      expect.arrayContaining([
        "first-check-in",
        "heritage-walker",
        "local-flavor",
        "pasalubong-explorer",
        "tayabas-starter",
        "faith-trail-visitor"
      ])
    );
  });

  it("does not synthesize time-dependent badge timestamps", () => {
    const badges = calculateBadges(
      {
        savedDestinationIds: [],
        checkIns: [
          {
            id: "c1",
            destinationId: "basilica",
            qrCode: "LLP:TAYABAS:BASILICA",
            pointsAwarded: 25,
            checkedInAt: "2026-05-29T00:00:00.000Z"
          }
        ],
        requests: []
      },
      destinations
    );

    const firstCheckInBadge = badges.find((badge) => badge.id === "first-check-in");

    expect(firstCheckInBadge).toMatchObject({ unlocked: true });
    expect(firstCheckInBadge).not.toHaveProperty("unlockedAt");
  });

  it("unlocks coupons at 50 points, 100 points, and 3 check ins", () => {
    const coupons = calculateUnlockedCoupons(100, 3);

    expect(coupons.filter((coupon) => coupon.claimed).map((coupon) => coupon.id)).toEqual(
      expect.arrayContaining([
        "coupon-pasalubong-5",
        "coupon-guide-tip-sheet",
        "coupon-route-souvenir"
      ])
    );
  });

  it("unlocks point coupons independent of coupon array order", () => {
    const coupons = calculateUnlockedCoupons(100, 0, [
      {
        id: "coupon-route-souvenir",
        title: "Route souvenir stamp",
        description: "Unlock after three destination check-ins.",
        pointsRequired: 0,
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
        id: "coupon-pasalubong-5",
        title: "Pasalubong 5% perk",
        description: "Unlock a demo 5% pasalubong perk after earning 50 points.",
        pointsRequired: 50,
        claimed: false
      }
    ]);

    expect(coupons.filter((coupon) => coupon.claimed).map((coupon) => coupon.id)).toEqual([
      "coupon-guide-tip-sheet",
      "coupon-pasalubong-5"
    ]);
  });
});
