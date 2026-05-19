"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { roleExperiences } from "@/lib/experience-data";
import { roleOrder } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

export function MobileDemoClient() {
  const [role, setRole] = useState<UserRole>("tourist");
  const experience = useMemo(() => roleExperiences[role], [role]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-lakbay-green">Mobile app demo</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Pick a user role</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">Each role gets a different mobile home screen, quick actions, and notification style.</p>
        <div className="mt-6 grid gap-2">
          {roleOrder.map((entry) => (
            <button
              key={entry}
              onClick={() => setRole(entry)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-black transition ${role === entry ? "border-lakbay-green bg-emerald-50 text-lakbay-green" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-lakbay-green"}`}
            >
              {roleExperiences[entry].label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[360px_1fr]">
        <div className="mx-auto w-full max-w-[360px] rounded-[2.5rem] border border-slate-300 bg-slate-950 p-3 shadow-soft">
          <div className="rounded-[2rem] bg-slate-50 p-4">
            <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-slate-300" />
            <div className="rounded-[1.5rem] bg-lakbay-green p-4 text-white">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-gold">{experience.mobileName}</p>
              <h3 className="mt-3 text-2xl font-black">{experience.label}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50">{experience.mission}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {experience.quickActions.map((action) => (
                <Link key={action.label} href={action.href} className="rounded-2xl bg-white p-3 text-sm font-black text-slate-800 shadow-sm">
                  <span>{action.label}</span>
                  <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-400">{action.hint}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Today</p>
              <div className="mt-3 space-y-3">
                {experience.inbox.slice(0, 2).map((item) => (
                  <div key={item.title} className="rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-slate-800">{item.title}</p>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-black text-lakbay-green">{item.status}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-[10px] font-black text-slate-500">
              <span>Explore</span>
              <span>Map</span>
              <span className="rounded-full bg-lakbay-green px-2 py-1 text-white">Scan</span>
              <span>Orders</span>
              <span>Pass</span>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-lakbay-green">What this user can access</p>
          <h3 className="mt-3 text-3xl font-black text-slate-950">{experience.dashboardName}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-500">{experience.uniqueMode}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-black text-slate-900">Mobile features</h4>
              <div className="mt-3 space-y-2">
                {experience.mobileFeatures.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{feature}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-slate-900">Web dashboard features</h4>
              <div className="mt-3 space-y-2">
                {experience.webFeatures.map((feature) => (
                  <div key={feature} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{feature}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
