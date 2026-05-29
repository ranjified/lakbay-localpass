"use client";

import { useMemo, useState } from "react";
import { eventTripBuilders } from "@/features/events/data";

export function EventTripBuilderClient() {
  const [selected, setSelected] = useState(eventTripBuilders[0].id);
  const [organizerStatus, setOrganizerStatus] = useState("Draft event listing");
  const [touristStatus, setTouristStatus] = useState("Not saved yet");
  const builder = useMemo(
    () => eventTripBuilders.find((entry) => entry.id === selected) ?? eventTripBuilders[0],
    [selected]
  );

  function publishEvent() {
    setOrganizerStatus("Published with connected food, ride, stay, and QR challenge");
    window.localStorage.setItem("lakbay-demo-event-builder", JSON.stringify({ event: builder.event, status: "published" }));
  }

  function saveTrip() {
    setTouristStatus("Saved to itinerary with local spending options");
    window.localStorage.setItem("lakbay-demo-event-trip", JSON.stringify({ event: builder.event, status: "saved" }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <section className="local-card rounded-[1.25rem] p-6">
        <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Organizer flow</p>
        <h2 className="mt-4 text-2xl font-black text-lakbay-deep">Create an event trip</h2>
        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Event listing</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {eventTripBuilders.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.event}</option>
              ))}
            </select>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Schedule" value={builder.schedule} />
            <Field label="Venue" value={builder.venue} />
            <Field label="Event QR" value={builder.eventQr} />
            <Field label="QR challenge" value={builder.qrChallenge} />
          </div>
          <button onClick={publishEvent} className="w-full rounded-full bg-lakbay-fiesta px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-deep">Publish connected event demo</button>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="heritage-hero rounded-[1.25rem] p-6 text-white shadow-soft">
          <div className="relative z-10">
          <p className="text-sm font-bold text-lakbay-gold">Trip Builder links</p>
          <h3 className="mt-3 text-2xl font-black">{builder.event}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><strong className="text-white">Food:</strong> {builder.nearbyFood}</p>
            <p><strong className="text-white">Ride:</strong> {builder.nearbyRide}</p>
            <p><strong className="text-white">Stay:</strong> {builder.nearbyStay}</p>
            <p><strong className="text-white">Organizer:</strong> {organizerStatus}</p>
            <p><strong className="text-white">Tourist:</strong> {touristStatus}</p>
          </div>
          <button onClick={saveTrip} className="mt-6 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-lakbay-deep transition hover:bg-lakbay-gold">Save to tourist itinerary</button>
          </div>
        </section>
      </aside>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-sm font-black text-slate-700">{label}</span>
      <input readOnly value={value} className="mt-2 w-full rounded-xl border border-lakbay-clay/20 bg-[#fffaf0] px-4 py-3 text-sm font-semibold text-lakbay-deep outline-none" />
    </label>
  );
}
