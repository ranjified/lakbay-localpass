import type { UserRole } from "../types";

export const roleLabels: Record<UserRole, string> = {
  tourist: "Tourist",
  merchant: "Merchant",
  provider: "Provider",
  tourism_staff: "Tourism staff",
  admin: "Admin"
};

export function canAccessTouristMvp(role: UserRole): boolean {
  return role === "tourist" || role === "admin";
}
