"use client";

import { useMemo, useState } from "react";
import { LiveRouteTracker } from "@/components/live-route-tracker";
import { destinations, tourPackages } from "@/features/tours/data";

const basilica = destinations.find((destination) => destination.id === "basilica-st-michael") ?? destinations[0];
const casaComunidad = destinations.find((destination) => destination.id === "casa-comunidad") ?? destinations[1];
const foodLoop = destinations.find((destination) => destination.id === "tayabas-food-loop") ?? destinations[4];

const guideStartPoint = {
  label: "Guide staging area near " + foodLoop.name,
  latitude: foodLoop.latitude,
  longitude: foodLoop.longitude
};

const meetingPoint = {
  label: basilica.name,
  latitude: basilica.latitude,
  longitude: basilica.longitude
};

const firstStoryStop = {
  label: casaComunidad.name,
  latitude: casaComunidad.latitude,
  longitude: casaComunidad.longitude
};

export function TourRequestClient() {
  const [selected, setSelected] = useState(tourPackages[0].id);
  const [status, setStatus] = useState("Choose guide");
  const tour = useMemo(() => tourPackages.find((entry) => entry.id === selected) ?? tourPackages[0], [selected]);
  const isActive = status !== "Choose guide";

  function submitTour() {
    setStatus("Guide matching");
    window.localStorage.setItem(
      "lakbay-demo-tour-request",
      JSON.stringify({ package: tour.name, guide: tour.guide, status: "Guide matching" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-5">
        <LiveRouteTracker
          title="Guide arrival tracker"
          roleLabel="Guide-hailing map"
          movingLabel="Guide current location"
          origin={guideStartPoint}
          destination={isActive ? firstStoryStop : meetingPoint}
          active={isActive}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-green">Meet guide</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{meetingPoint.label}</p>
          </div>
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-blue">First stop</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{firstStoryStop.label}</p>
          </div>
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-clay">Tour status</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{status}</p>
          </div>
        </div>
      </section>

      <aside className="local-card rounded-[1.5rem] p-5 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Guide booking</p>
            <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Book a guide</h2>
          </div>
          <div className="rounded-full bg-lakbay-green px-4 py-2 text-xs font-black text-white">Arrival ETA</div>
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-lakbay-green/15 bg-white p-4 shadow-sm">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Meeting point</span>
              <input defaultValue="Minor Basilica entrance" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Tour route</span>
              <input defaultValue="Basilica to Casa Comunidad" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
            </label>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <p className="text-sm font-black text-slate-700">Choose guide package</p>
          {tourPackages.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelected(entry.id)}
              className={`w-full rounded-[1.15rem] border p-4 text-left transition ${selected === entry.id ? "border-lakbay-green bg-lakbay-green text-white" : "border-slate-200 bg-white text-lakbay-deep hover:border-lakbay-blue"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-black">{entry.name}</span>
                <span className="text-xs font-black">{entry.duration}</span>
              </span>
              <span className={`mt-1 block text-xs font-semibold ${selected === entry.id ? "text-white/75" : "text-lakbay-deep/55"}`}>{entry.guide}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Group size</span>
            <input defaultValue="12" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-slate-700">Start time</span>
            <input defaultValue="Now" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-black text-slate-700">Learning focus</span>
          <textarea defaultValue="Civic history and heritage preservation for a student group." className="mt-2 min-h-24 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
        </label>

        <div className="mt-5 rounded-[1.25rem] bg-lakbay-gold/15 p-4">
          <p className="text-sm font-black text-lakbay-deep">{tour.name}</p>
          <p className="mt-1 text-sm leading-6 text-lakbay-deep/65">{tour.idealFor}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tour.storyCards.slice(0, 3).map((card) => (
              <span key={card} className="rounded-full bg-white px-3 py-1 text-[11px] font-black text-lakbay-green">{card}</span>
            ))}
          </div>
        </div>

        <button onClick={submitTour} className="mt-5 w-full rounded-full bg-lakbay-green px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-blue">
          {isActive ? "Update guide request" : "Find nearby guide"}
        </button>
      </aside>
    </div>
  );
}
