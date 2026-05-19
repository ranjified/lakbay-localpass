"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { businesses, destinations, roleProfiles } from "@/lib/mock-data";
import { demoRequests, roleExperiences } from "@/lib/experience-data";
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
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-lakbay-gold">{experience.dashboardName}</p>
              <h1 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">{profile.label}</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{experience.mission}</p>
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-lakbay-green">Web app access</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">Workspace</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{profile.summary}</p>
              </div>
              <Link href="/mobile" className="rounded-full bg-lakbay-green px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-slate-950">
                Mobile Preview
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {experience.webFeatures.map((feature) => (
                <div key={feature} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">
                  {feature}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-lakbay-green">Unique feature</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{experience.colorTag}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{experience.uniqueMode}</p>
            <div className="mt-5 rounded-3xl bg-slate-50 p-5">
              <p className="text-sm font-black text-slate-900">Demo scenario</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{experience.demoScenario}</p>
            </div>
          </section>
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-lakbay-green">Quick actions</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">What this user can do</h2>
            </div>
            <Link href="/services" className="rounded-full border border-slate-200 px-5 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-lakbay-green hover:text-lakbay-green">Open all demo services</Link>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {experience.quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-lakbay-green hover:bg-emerald-50">
                <p className="text-lg font-black text-slate-950">{action.label}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500">{action.hint}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-lakbay-green">Mobile app access</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">{experience.mobileName}</h2>
            <div className="mt-5 space-y-3">
              {experience.mobileFeatures.map((feature) => (
                <div key={feature} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">{feature}</div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-lakbay-green">Status tracking demo</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">Requests and bookings</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {requestsForRole.slice(0, 4).map((request) => <RequestStatusCard key={request.id} request={request} />)}
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

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-950">Live demo data</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
            <p className="rounded-2xl bg-slate-50 p-4"><strong>{destinations.length}</strong> destinations seeded</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>{businesses.length}</strong> local partner listings</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>{statusSummary.approved}</strong> approved, <strong>{statusSummary.pending}</strong> pending, <strong>{statusSummary.needs_review}</strong> needs review</p>
          </div>
        </section>
      </section>
    </main>
  );
}
