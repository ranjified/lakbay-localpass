"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { businesses, destinations, roleProfiles } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";
import { RoleSwitcher } from "./role-switcher";
import { StatCard } from "./stat-card";

const storageKey = "lakbay-localpass-role";

export function DashboardClient({ defaultRole = "tourist" }: { defaultRole?: UserRole }) {
  const [role, setRole] = useState<UserRole>(defaultRole);

  useEffect(() => {
    if (defaultRole !== "tourist") {
      window.localStorage.setItem(storageKey, defaultRole);
      setRole(defaultRole);
      return;
    }

    const saved = window.localStorage.getItem(storageKey) as UserRole | null;
    if (saved && saved in roleProfiles) {
      setRole(saved);
    }
  }, [defaultRole]);

  function handleRoleChange(nextRole: UserRole) {
    setRole(nextRole);
    window.localStorage.setItem(storageKey, nextRole);
  }

  const profile = roleProfiles[role];
  const statusSummary = useMemo(() => {
    return businesses.reduce(
      (acc, business) => {
        acc[business.status] += 1;
        return acc;
      },
      { approved: 0, pending: 0, needs_review: 0 }
    );
  }, []);

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-lakbay-gold">Dynamic dashboard</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{profile.label}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{profile.headline}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Demo account: {profile.demoEmail}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 text-slate-950">
              <RoleSwitcher value={role} onChange={handleRoleChange} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {profile.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Workspace</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{profile.summary}</p>
              </div>
              <Link href="/map" className="rounded-full bg-lakbay-green px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-950">
                Open Map
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {profile.primaryActions.map((action) => (
                <button key={action} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left text-sm font-bold text-slate-700 transition hover:border-lakbay-green hover:bg-emerald-50 hover:text-lakbay-green">
                  {action}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">Live demo data</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <p><strong>{destinations.length}</strong> destinations seeded</p>
              <p><strong>{businesses.length}</strong> local partner listings</p>
              <p><strong>{statusSummary.approved}</strong> approved, <strong>{statusSummary.pending}</strong> pending, <strong>{statusSummary.needs_review}</strong> needs review</p>
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {profile.panels.map((panel) => (
            <section key={panel.title} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h3 className="text-xl font-black text-slate-950">{panel.title}</h3>
              <div className="mt-5 space-y-3">
                {panel.items.map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {(role === "tourism_staff" || role === "admin") && (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Approval console</h2>
                <p className="mt-2 text-sm text-slate-500">Sample queue for destination, merchant, guide, transport, accommodation, and event approvals.</p>
              </div>
              <Link href="/admin" className="rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-lakbay-green hover:text-lakbay-green">
                Open Admin View
              </Link>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Listing</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((business) => (
                    <tr key={business.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-bold text-slate-800">{business.name}</td>
                      <td className="px-4 py-3 text-slate-500">{business.type}</td>
                      <td className="px-4 py-3 text-slate-500">{business.status.replace("_", " ")}</td>
                      <td className="px-4 py-3 text-slate-500">{business.engagement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
