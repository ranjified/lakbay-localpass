import { DashboardClient } from "@/components/dashboard-client";
import { roleProfiles } from "@/features/dashboard/data";
import type { UserRole } from "@/lib/types";

function isUserRole(value: string | undefined): value is UserRole {
  return Boolean(value && value in roleProfiles);
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ role?: string }> }) {
  const params = await searchParams;
  const defaultRole = isUserRole(params?.role) ? params.role : "tourist";
  return <DashboardClient defaultRole={defaultRole} />;
}
