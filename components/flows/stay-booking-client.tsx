"use client";

import { useMemo, useState } from "react";
import { stayOptions, tripStyles } from "@/lib/mock-data";

export function StayBookingClient() {
  const [selected, setSelected] = useState(stayOptions[0].id);
  const [tripStyle, setTripStyle] = useState(tripStyles[4]);
  const [status, setStatus] = useState("Draft");
  const stay = useMemo(() => stayOptions.find((entry) => entry.id === selected) ?? stayOptions[0], [selected]);

  function submitBooking() {
    setStatus("Pending host confirmation");
    window.localStorage.setItem(
      "lakbay-demo-stay-booking",
      JSON.stringify({ stay: stay.name, room: stay.room, tripStyle, status: "Pending host confirmation" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="local-card rounded-[1.25rem] p-6">
        <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Tourist flow</p>
        <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Book a Stay Tayabas listing</h2>
        <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">Stay Match recommends accommodations by purpose of visit, not just by room. This helps small stays compete through local experience.</p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Trip style</span>
            <select value={tripStyle} onChange={(event) => setTripStyle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {tripStyles.map((style) => <option key={style}>{style}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Choose stay</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {stayOptions.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.name} - {entry.bestFor}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Check-in</span>
              <input type="date" defaultValue="2026-06-10" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Check-out</span>
              <input type="date" defaultValue="2026-06-11" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Guests</span>
              <input defaultValue="4" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Payment preference</span>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
                <option>Reservation only</option>
                <option>Pay on arrival</option>
                <option>GCash later</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Special request</span>
            <textarea defaultValue="We need parking, breakfast option, and nearby family-friendly stops." className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
          </label>

          <button onClick={submitBooking} className="w-full rounded-full bg-lakbay-fiesta px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-deep">Send stay booking request</button>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="heritage-hero rounded-[1.25rem] p-6 text-white shadow-soft">
          <div className="relative z-10">
          <p className="text-sm font-bold text-lakbay-gold">Stay Match preview</p>
          <h3 className="mt-3 text-2xl font-black">{stay.name}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><strong className="text-white">Type:</strong> {stay.stayType}</p>
            <p><strong className="text-white">Room:</strong> {stay.room}</p>
            <p><strong className="text-white">Rate:</strong> {stay.rate}</p>
            <p><strong className="text-white">Location:</strong> {stay.location}</p>
            <p><strong className="text-white">Status:</strong> {status}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {stay.matchTags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">{tag}</span>)}
          </div>
          </div>
        </section>

        <section className="local-card rounded-[1.25rem] p-6">
          <h3 className="text-xl font-black text-lakbay-deep">Host side</h3>
          <div className="mt-4 space-y-3 text-sm text-lakbay-deep/65">
            <p className="route-ticket rounded-xl p-4"><strong>Booking inbox:</strong> Host sees dates, guest count, trip style, and special request.</p>
            <p className="route-ticket rounded-xl p-4"><strong>Status buttons:</strong> Confirm, Decline, Request more info, Send check-in guide.</p>
            <p className="route-ticket rounded-xl p-4"><strong>Unique:</strong> Host can recommend food, ride, and guide add-ons after confirming the room.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}
