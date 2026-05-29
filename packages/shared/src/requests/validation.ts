import type { RequestStatusStep, RequestType } from "../types";

const requiredFields: Record<RequestType, Record<string, string>> = {
  food_pasabay: {
    itemOrBundle: "Item or bundle is required.",
    quantity: "Quantity is required.",
    pickupDate: "Pickup date is required.",
    pickupTime: "Pickup time is required."
  },
  stay: {
    checkInDate: "Check in date is required.",
    checkOutDate: "Check out date is required.",
    guestCount: "Number of guests is required.",
    preferredArea: "Preferred area is required.",
    budgetRange: "Budget range is required."
  },
  ride: {
    pickupPoint: "Pickup point is required.",
    destination: "Destination is required.",
    date: "Date is required.",
    time: "Time is required.",
    passengerCount: "Number of passengers is required."
  },
  tour: {
    preferredRoute: "Preferred route is required.",
    date: "Date is required.",
    groupSize: "Group size is required.",
    guidePreference: "Guide preference is required."
  }
};

export function validateRequestDetails(type: RequestType, details: Record<string, string>) {
  const errors: Record<string, string> = {};

  for (const [field, message] of Object.entries(requiredFields[type])) {
    if (!details[field]?.trim()) {
      errors[field] = message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function generateRequestTimeline(createdAt: string): RequestStatusStep[] {
  return [
    {
      status: "submitted",
      label: "Submitted",
      description: "Your demo inquiry was saved on this device.",
      completed: true,
      timestamp: createdAt
    },
    {
      status: "received",
      label: "Received by local partner",
      description: "A local partner receives this in the production workflow.",
      completed: false
    },
    {
      status: "in_review",
      label: "In review",
      description: "Details are checked before confirmation.",
      completed: false
    },
    {
      status: "ready_for_confirmation",
      label: "Ready for confirmation",
      description: "The partner can confirm schedule, price, and next steps.",
      completed: false
    },
    {
      status: "completed",
      label: "Completed",
      description: "The tourist marks the request complete after the visit.",
      completed: false
    }
  ];
}
