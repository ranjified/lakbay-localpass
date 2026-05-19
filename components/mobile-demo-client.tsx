"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mobileRoleScreens, roleExperiences, roleOrder } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

export function MobileDemoClient() {
  const [role, setRole] = useState<UserRole>("tourist");
  const experience = useMemo(() => roleExperiences[role], [role]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <section className="local-card rounded-[1.25rem] p-6">
        <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Mobile app demo</p>
        <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Pick a user role</h2>
        <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">Each role gets a different mobile home screen, quick actions, and notification style.</p>
        <div className="mt-6 grid gap-2">
          {roleOrder.map((entry) => (
            <button
              key={entry}
              onClick={() => setRole(entry)}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-black transition ${role === entry ? "border-lakbay-fiesta bg-lakbay-gold/20 text-lakbay-clay" : "border-lakbay-clay/20 bg-[#fffaf0] text-lakbay-deep/70 hover:border-lakbay-fiesta"}`}
            >
              {roleExperiences[entry].label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[360px_1fr]">
        <div className="mx-auto w-full max-w-[360px] rounded-[2.2rem] border-4 border-lakbay-deep bg-lakbay-deep p-3 shadow-soft">
          <div className="rounded-[1.7rem] bg-[#fffaf0] p-4">
            <div className="mx-auto mb-4 h-1.5 w-20 rounded-full bg-lakbay-clay/30" />
            <div className="heritage-hero rounded-[1.2rem] p-4 text-white">
              <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-gold">{experience.mobileName}</p>
              <h3 className="mt-3 text-2xl font-black">{experience.label}</h3>
              <p className="mt-3 text-sm leading-6 text-emerald-50">{experience.mission}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {experience.quickActions.map((action) => (
                <Link key={action.label} href={action.href} className="route-ticket rounded-xl p-3 text-sm font-black text-lakbay-deep shadow-sm">
                  <span>{action.label}</span>
                  <span className="mt-1 block text-[11px] font-semibold leading-4 text-slate-400">{action.hint}</span>
                </Link>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-lakbay-clay/20 bg-white/80 p-4 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">Today</p>
              <div className="mt-3 space-y-3">
                {experience.inbox.slice(0, 2).map((item) => (
                  <div key={item.title} className="rounded-xl bg-lakbay-paper/70 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-lakbay-deep">{item.title}</p>
                      <span className="rounded-full bg-lakbay-gold/20 px-2 py-1 text-[10px] font-black text-lakbay-clay">{item.status}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-lakbay-deep/60">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-2 text-center text-[10px] font-black text-lakbay-deep/55">
              <span>Explore</span>
              <span>Map</span>
              <span className="rounded-full bg-lakbay-fiesta px-2 py-1 text-white">Scan</span>
              <span>Orders</span>
              <span>Pass</span>
            </div>
          </div>
        </div>

        <div className="local-card rounded-[1.25rem] p-6">
          <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">What this user can access</p>
          <h3 className="mt-4 text-3xl font-black text-lakbay-deep">{experience.dashboardName}</h3>
          <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">{experience.uniqueMode}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-black text-lakbay-deep">Mobile features</h4>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-lakbay-clay">
                {mobileRoleScreens.find((screen) => screen.role === role)?.screenName}
              </p>
              <div className="mt-3 space-y-2">
                {experience.mobileFeatures.map((feature) => (
                  <div key={feature} className="route-ticket rounded-xl px-4 py-3 text-sm font-semibold text-lakbay-deep">{feature}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-black text-lakbay-deep">Web dashboard features</h4>
              <div className="mt-3 space-y-2">
                {experience.webFeatures.map((feature) => (
                  <div key={feature} className="route-ticket rounded-xl px-4 py-3 text-sm font-semibold text-lakbay-deep">{feature}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
