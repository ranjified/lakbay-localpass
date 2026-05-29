"use client";

import type { UserRole } from "@/lib/types";
import { roleOrder, roleProfiles } from "@/features/dashboard/data";

export function RoleSwitcher({ value, onChange }: { value: UserRole; onChange: (role: UserRole) => void }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-600 sm:flex-row sm:items-center">
      View dashboard as
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as UserRole)}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-950 outline-none ring-lakbay-green transition focus:ring-4"
      >
        {roleOrder.map((role) => (
          <option key={role} value={role}>
            {roleProfiles[role].label}
          </option>
        ))}
      </select>
    </label>
  );
}
