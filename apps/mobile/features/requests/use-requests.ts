import {
  generateRequestTimeline,
  partnerListings,
  requestTypeLabels,
  validateRequestDetails,
  type RequestType,
  type ServiceRequest
} from "@lakbay/shared";

import { useLocalPass } from "../localpass/localpass-context";

type CreateRequestInput = {
  type: RequestType;
  details: Record<string, string>;
  title?: string;
};

export function useRequests() {
  const { state, createRequest } = useLocalPass();

  function createTouristRequest(input: CreateRequestInput) {
    const createdAt = new Date().toISOString();
    const request: ServiceRequest = {
      id: `request-${input.type}-${Date.now()}`,
      type: input.type,
      title: input.title ?? `${requestTypeLabels[input.type]} request`,
      details: input.details,
      status: "submitted",
      createdAt,
      timeline: generateRequestTimeline(createdAt)
    };

    createRequest(request);
    return request;
  }

  return {
    requests: state.requests,
    partnerListings,
    requestTypeLabels,
    validateRequestDetails,
    createRequest: createTouristRequest,
    getRequest: (requestId: string) => state.requests.find((request) => request.id === requestId),
    getRequestsByType: (type: RequestType) => state.requests.filter((request) => request.type === type)
  };
}
