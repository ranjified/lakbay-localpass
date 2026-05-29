import { CHECK_IN_POINTS } from "../constants";
import { badges as baseBadges } from "../mock-data/badges";
import { coupons as baseCoupons } from "../mock-data/coupons";
import type { Coupon, Destination, LocalPassBadge, LocalPassCheckIn, ServiceRequest } from "../types";

export type QrCheckInResult =
  | { status: "recognized"; destination: Destination; pointsAwarded: 25 }
  | { status: "duplicate"; destination: Destination; pointsAwarded: 0 }
  | { status: "invalid"; destination?: undefined; pointsAwarded: 0 };

export function getQrCheckInResult(
  qrCode: string,
  checkIns: LocalPassCheckIn[],
  destinations: Destination[]
): QrCheckInResult {
  const destination = destinations.find((item) => item.qrCode === qrCode);
  if (!destination) {
    return { status: "invalid", pointsAwarded: 0 };
  }

  const duplicate = checkIns.some((checkIn) => checkIn.destinationId === destination.id);
  if (duplicate) {
    return { status: "duplicate", destination, pointsAwarded: 0 };
  }

  return { status: "recognized", destination, pointsAwarded: CHECK_IN_POINTS };
}

export function calculateBadges(
  state: {
    savedDestinationIds: string[];
    checkIns: LocalPassCheckIn[];
    requests: ServiceRequest[];
  },
  destinations: Destination[]
): LocalPassBadge[] {
  const checkedDestinations = state.checkIns
    .map((checkIn) => destinations.find((destination) => destination.id === checkIn.destinationId))
    .filter((destination): destination is Destination => Boolean(destination));
  const heritageCheckIns = checkedDestinations.filter((destination) => destination.category === "heritage").length;
  const faithCheckIns = checkedDestinations.filter((destination) => destination.category === "faith").length;
  const hasFoodOrPasalubongActivity =
    state.requests.some((request) => request.type === "food_pasabay") ||
    state.savedDestinationIds.some((id) => {
      const destination = destinations.find((item) => item.id === id);
      return destination?.category === "food" || destination?.category === "pasalubong";
    });

  const unlocked = new Set<string>();
  if (state.checkIns.length >= 1) unlocked.add("first-check-in");
  if (heritageCheckIns >= 3) unlocked.add("heritage-walker");
  if (hasFoodOrPasalubongActivity) unlocked.add("local-flavor");
  if (state.requests.some((request) => request.type === "food_pasabay")) unlocked.add("pasalubong-explorer");
  if (state.savedDestinationIds.length >= 3) unlocked.add("tayabas-starter");
  if (faithCheckIns >= 1) unlocked.add("faith-trail-visitor");

  return baseBadges.map((badge) => ({
    ...badge,
    unlocked: unlocked.has(badge.id),
    unlockedAt: unlocked.has(badge.id) ? new Date().toISOString() : undefined
  }));
}

export function calculateUnlockedCoupons(points: number, checkInCount: number): Coupon[] {
  return baseCoupons.map((coupon, index) => ({
    ...coupon,
    claimed:
      (index === 0 && points >= 50) ||
      (index === 1 && points >= 100) ||
      (coupon.id === "coupon-route-souvenir" && checkInCount >= 3)
  }));
}
