"use client";

import { useMemo, useState } from "react";
import { tourPackages } from "@/lib/mock-data";

export function TourRequestClient() {
  const [selected, setSelected] = useState(tourPackages[0].id);
  const [status, setStatus] = useState("Draft");
  const tour = useMemo(() => tourPackages.find((entry) => entry.id === selected) ?? tourPackages[0], [selected]);

  function submitTour() {
    setStatus("Pending guide confirmation");
    window.localStorage.setItem(
      "lakbay-demo-tour-request",
      JSON.stringify({ package: tour.name, guide: tour.guide, status: "Pending guide confirmation" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="local-card rounded-[1.25rem] p-6">
        <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Tourist flow</p>
        <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Request a local guide</h2>
        <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">Kwentong Gabay turns local knowledge into bookable tours with story cards tied to QR heritage content.</p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Choose guide package</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {tourPackages.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.name} - {entry.duration}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Date</span>
              <input type="date" defaultValue="2026-06-10" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Group size</span>
              <input defaultValue="12" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Learning focus or request</span>
            <textarea defaultValue="Please focus on civic history and heritage preservation. This is for a student group." className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
          </label>

          <button onClick={submitTour} className="w-full rounded-full bg-lakbay-fiesta px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-deep">Send guide request</button>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="heritage-hero rounded-[1.25rem] p-6 text-white shadow-soft">
          <div className="relative z-10">
          <p className="text-sm font-bold text-lakbay-gold">Kwentong Gabay preview</p>
          <h3 className="mt-3 text-2xl font-black">{tour.name}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><strong className="text-white">Guide:</strong> {tour.guide}</p>
            <p><strong className="text-white">Duration:</strong> {tour.duration}</p>
            <p><strong className="text-white">Ideal for:</strong> {tour.idealFor}</p>
            <p><strong className="text-white">Meeting point:</strong> {tour.meetingPoint}</p>
            <p><strong className="text-white">Status:</strong> {status}</p>
          </div>
          </div>
        </section>

        <section className="local-card rounded-[1.25rem] p-6">
          <h3 className="text-xl font-black text-lakbay-deep">Guide story cards</h3>
          <div className="mt-4 grid gap-3">
            {tour.storyCards.map((card) => (
              <div key={card} className="route-ticket rounded-xl p-4 text-sm font-bold text-lakbay-deep">{card}</div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-lakbay-deep/60">Guide can open these cards on mobile during the actual tour.</p>
        </section>
      </aside>
    </div>
  );
}
