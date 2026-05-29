import type { UserRole } from "@/lib/types";
import { isStaffRole } from "./roles";

type RequestOwner = {
  ownerRole: UserRole;
};

export function canUpdateRequest(actorRole: UserRole, request: RequestOwner) {
  if (actorRole === request.ownerRole) {
    return true;
  }

  return isStaffRole(actorRole);
}
