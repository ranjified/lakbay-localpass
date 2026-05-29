import type { UserRole } from "@/lib/types";

export const roleHierarchy: Record<UserRole, number> = {
  tourist: 10,
  merchant: 20,
  guide: 20,
  transport: 20,
  accommodation: 20,
  event_organizer: 20,
  tourism_staff: 80,
  admin: 100
};

export const providerRoles: UserRole[] = ["merchant", "guide", "transport", "accommodation", "event_organizer"];
export const staffRoles: UserRole[] = ["tourism_staff", "admin"];

export function isProviderRole(role: UserRole) {
  return providerRoles.includes(role);
}

export function isStaffRole(role: UserRole) {
  return staffRoles.includes(role);
}

export function hasRoleLevel(role: UserRole, minimumRole: UserRole) {
  return roleHierarchy[role] >= roleHierarchy[minimumRole];
}
