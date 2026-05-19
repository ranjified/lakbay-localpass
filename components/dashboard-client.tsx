"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { adminTrustQueue, businesses, demoRequests, destinations, roleExperiences, roleProfiles, tourismHeatPulse } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";
import { RoleSwitcher } from "./role-switcher";
import { StatCard } from "./stat-card";
import { RequestStatusCard } from "./flows/request-status-card";

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
  const experience = roleExperiences[role];
  const requestsForRole = demoRequests.filter((request) => request.ownerRole === role || role === "tourist" || role === "tourism_staff" || role === "admin");
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
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero rounded-[1.5rem] p-6 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-lakbay-gold">{experience.dashboardName}</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{profile.label}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{experience.mission}</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">Demo account: {profile.demoEmail}</p>
            </div>
            <div className="rounded-2xl border border-lakbay-gold/30 bg-[#fffaf0] p-4 text-lakbay-deep">
              <RoleSwitcher value={role} onChange={handleRoleChange} />
            </div>
          </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {profile.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="local-card rounded-[1.25rem] p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Web app access</p>
                <h2 className="mt-3 text-2xl font-black text-lakbay-deep">Workspace</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-lakbay-deep/60">{profile.summary}</p>
              </div>
              <Link href="/mobile" className="rounded-full bg-lakbay-fiesta px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-lakbay-deep">
                Mobile Preview
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {experience.webFeatures.map((feature) => (
                <div key={feature} className="route-ticket rounded-xl p-4 text-sm font-bold text-lakbay-deep">
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Unique feature</p>
            <h2 className="mt-3 text-2xl font-black text-lakbay-deep">{experience.colorTag}</h2>
            <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">{experience.uniqueMode}</p>
            <div className="route-ticket mt-5 rounded-xl p-5">
              <p className="text-sm font-black text-lakbay-deep">Demo scenario</p>
              <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{experience.demoScenario}</p>
            </div>
          </section>
        </div>

        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Quick actions</p>
              <h2 className="mt-3 text-2xl font-black text-lakbay-deep">What this user can do</h2>
            </div>
            <Link href="/services" className="rounded-full border border-lakbay-clay/30 px-5 py-3 text-center text-sm font-bold text-lakbay-deep transition hover:border-lakbay-fiesta hover:text-lakbay-fiesta">Open all demo services</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {experience.quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="route-ticket rounded-xl p-5 transition hover:-translate-y-1 hover:border-lakbay-fiesta">
                <p className="text-lg font-black text-lakbay-deep">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{action.hint}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Mobile app access</p>
            <h2 className="mt-3 text-2xl font-black text-lakbay-deep">{experience.mobileName}</h2>
            <div className="mt-5 space-y-3">
              {experience.mobileFeatures.map((feature) => (
                <div key={feature} className="route-ticket rounded-xl px-4 py-3 text-sm font-bold text-lakbay-deep">{feature}</div>
              ))}
            </div>
          </section>

          <section className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Status tracking demo</p>
            <h2 className="mt-3 text-2xl font-black text-lakbay-deep">Requests and bookings</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {requestsForRole.slice(0, 4).map((request) => <RequestStatusCard key={request.id} request={request} />)}
            </div>
          </section>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {profile.panels.map((panel) => (
            <section key={panel.title} className="local-card rounded-[1.25rem] p-6">
              <h3 className="text-xl font-black text-lakbay-deep">{panel.title}</h3>
              <div className="mt-5 space-y-3">
                {panel.items.map((item) => (
                  <div key={item} className="route-ticket rounded-xl px-4 py-3 text-sm font-semibold text-lakbay-deep">
                    {item}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {(role === "tourism_staff" || role === "admin") && (
          <section className="local-card mt-8 rounded-[1.25rem] p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-lakbay-deep">Approval console</h2>
                <p className="mt-2 text-sm text-lakbay-deep/60">Sample queue for destination, merchant, guide, transport, accommodation, and event approvals.</p>
              </div>
              <Link href="/admin" className="rounded-full border border-lakbay-clay/30 px-5 py-3 text-center text-sm font-bold text-lakbay-deep transition hover:border-lakbay-fiesta hover:text-lakbay-fiesta">
                Open Admin View
              </Link>
            </div>
            <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">Queue item</th>
                    <th className="px-4 py-3">Signal</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Console</th>
                  </tr>
                </thead>
                <tbody>
                  {adminTrustQueue.map((item) => (
                    <tr key={item.id} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-bold text-slate-800">{item.item}</td>
                      <td className="px-4 py-3 text-slate-500">{item.risk}</td>
                      <td className="px-4 py-3 text-slate-500">{item.status}</td>
                      <td className="px-4 py-3 text-slate-500">Trust Queue</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {role === "tourism_staff" && (
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {tourismHeatPulse.map((pulse) => (
                  <div key={pulse.label} className="rounded-2xl bg-emerald-50 p-4">
                    <p className="text-sm font-black text-slate-950">{pulse.value}</p>
                    <p className="mt-1 text-xs font-bold text-lakbay-green">{pulse.label}</p>
                    <p className="mt-1 text-xs text-slate-500">{pulse.trend}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Live demo data</h2>
          <div className="mt-5 grid gap-3 text-sm text-lakbay-deep/65 md:grid-cols-3">
            <p className="route-ticket rounded-xl p-4"><strong>{destinations.length}</strong> destinations seeded</p>
            <p className="route-ticket rounded-xl p-4"><strong>{businesses.length}</strong> local partner listings</p>
            <p className="route-ticket rounded-xl p-4"><strong>{statusSummary.approved}</strong> approved, <strong>{statusSummary.pending}</strong> pending, <strong>{statusSummary.needs_review}</strong> needs review</p>
          </div>
        </section>
      </section>
    </main>
  );
}
