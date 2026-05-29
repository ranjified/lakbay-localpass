import { destinations, productCopy } from "@lakbay/shared";

import { useLocalPass } from "../localpass/localpass-context";

export function useProfile() {
  const { state } = useLocalPass();
  const savedDestinationIds = state.savedDestinations.map((item) => item.destinationId);
  const savedDestinations = savedDestinationIds
    .map((destinationId) => destinations.find((destination) => destination.id === destinationId))
    .filter((destination): destination is (typeof destinations)[number] => Boolean(destination));

  return {
    profile: {
      id: "demo-tourist",
      name: "Demo Tourist",
      role: "tourist" as const,
      homeBase: productCopy.location,
      tripLabel: `${productCopy.location} demo trip`
    },
    tripSummary: {
      savedCount: state.savedDestinations.length,
      checkInCount: state.checkIns.length,
      requestCount: state.requests.length,
      points: state.points,
      savedDestinations
    },
    recentActivity: state.activity.slice(0, 5)
  };
}
