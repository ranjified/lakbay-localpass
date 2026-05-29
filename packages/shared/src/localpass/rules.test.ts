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
});
