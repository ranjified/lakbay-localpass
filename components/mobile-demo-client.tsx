"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mobileRoleScreens, roleExperiences, roleOrder } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

const navItems = ["Home", "Map", "Scan", "Trips", "Pass"];

export function MobileDemoClient() {
  const [role, setRole] = useState<UserRole>("tourist");
  const experience = useMemo(() => roleExperiences[role], [role]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
      <section className="local-card rounded-[1.25rem] p-6">
        <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Mobile device preview</p>
        <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Choose the app role</h2>
        <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">The phone preview now behaves like a mobile screen: compact header, scrollable content, app cards, notifications, and fixed bottom tabs.</p>
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

      <section className="grid gap-6 xl:grid-cols-[410px_1fr]">
        <div className="mx-auto w-full max-w-[410px] rounded-[3rem] border-[10px] border-[#111827] bg-[#111827] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
          <div className="relative h-[820px] overflow-hidden rounded-[2.35rem] bg-[#f8faf7]">
            <div className="absolute left-1/2 top-0 z-20 h-7 w-36 -translate-x-1/2 rounded-b-3xl bg-[#111827]" />
            <div className="flex h-11 items-end justify-between bg-[#f8faf7] px-6 pb-2 text-[11px] font-black text-lakbay-deep">
              <span>9:41</span>
              <span className="tracking-[0.2em]">LTE 100%</span>
            </div>

            <div className="h-[724px] overflow-y-auto px-5 pb-28 pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">Lakbay LocalPass</p>
                  <h3 className="mt-1 text-2xl font-black text-lakbay-deep">{experience.mobileName}</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-lakbay-blue text-sm font-black text-white">
                  {experience.label.slice(0, 1)}
                </div>
              </div>

              <section className="mt-5 overflow-hidden rounded-[1.75rem] bg-lakbay-deep text-white shadow-soft">
                <div className="bg-[linear-gradient(145deg,rgba(43,109,79,0.96),rgba(0,71,126,0.96))] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-gold">{experience.colorTag}</p>
                  <h4 className="mt-4 text-3xl font-black leading-tight">{experience.label}</h4>
                  <p className="mt-3 text-sm leading-6 text-emerald-50">{experience.mission}</p>
                </div>
              </section>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {experience.quickActions.map((action) => (
                  <Link key={action.label} href={action.href} className="rounded-[1.25rem] border border-lakbay-green/15 bg-white p-4 text-sm font-black text-lakbay-deep shadow-sm">
                    <span>{action.label}</span>
                    <span className="mt-2 block text-[11px] font-semibold leading-4 text-slate-500">{action.hint}</span>
                  </Link>
                ))}
              </div>

              <section className="mt-5 rounded-[1.5rem] border border-lakbay-green/15 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-black text-lakbay-deep">Today</p>
                  <span className="rounded-full bg-lakbay-gold/20 px-3 py-1 text-[10px] font-black text-lakbay-clay">Live</span>
                </div>
                <div className="mt-4 space-y-3">
                  {experience.inbox.slice(0, 3).map((item) => (
                    <div key={item.title} className="rounded-[1.1rem] bg-lakbay-paper/70 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-black text-lakbay-deep">{item.title}</p>
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-lakbay-green">{item.status}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-lakbay-deep/60">{item.note}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5 rounded-[1.5rem] border border-lakbay-green/15 bg-white p-4 shadow-sm">
                <p className="text-sm font-black text-lakbay-deep">Mobile tools</p>
                <div className="mt-3 space-y-2">
                  {experience.mobileFeatures.slice(0, 4).map((feature) => (
                    <p key={feature} className="rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-lakbay-deep/70">{feature}</p>
                  ))}
                </div>
              </section>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/95 px-4 pb-5 pt-3 backdrop-blur">
              <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-black text-lakbay-deep/55">
                {navItems.map((item) => (
                  <span key={item} className={item === "Scan" ? "rounded-full bg-lakbay-blue px-2 py-2 text-white" : "py-2"}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-slate-300" />
            </div>
          </div>
        </div>

        <div className="local-card rounded-[1.25rem] p-6">
          <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Role capability map</p>
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
