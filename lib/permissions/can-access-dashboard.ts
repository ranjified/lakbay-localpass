import type { UserRole } from "@/lib/types";
import { isStaffRole } from "./roles";

export function canAccessDashboard(actorRole: UserRole, dashboardRole: UserRole) {
  if (actorRole === dashboardRole) {
    return true;
  }

  return isStaffRole(actorRole);
}
