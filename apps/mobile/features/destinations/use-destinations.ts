import { destinations, suggestedRoutes, tourismCategories, type Destination, type TourismCategory } from "@lakbay/shared";

import { useLocalPass } from "../localpass/localpass-context";

export function useDestinations(category?: TourismCategory) {
  const { state, saveDestination, removeDestination } = useLocalPass();
  const savedDestinationIds = state.savedDestinations.map((item) => item.destinationId);
  const visibleDestinations = category
    ? destinations.filter((destination) => destination.category === category)
    : destinations;

  return {
    destinations: visibleDestinations,
    allDestinations: destinations,
    featuredDestinations: destinations.filter((destination) => destination.featured),
    suggestedRoutes,
    categories: tourismCategories,
    savedDestinationIds,
    savedDestinations: state.savedDestinations
      .map((item) => destinations.find((destination) => destination.id === item.destinationId))
      .filter((destination): destination is Destination => Boolean(destination)),
    isSaved: (destinationId: string) => savedDestinationIds.includes(destinationId),
    getDestination: (destinationId: string) => destinations.find((destination) => destination.id === destinationId),
    saveDestination,
    removeDestination
  };
}
