"use client";

import { useMemo, useState } from "react";
import { LiveRouteTracker } from "@/components/live-route-tracker";
import { destinations, tripStyles, vehiclePackages } from "@/features/transport/data";

const casaComunidad = destinations.find((destination) => destination.id === "casa-comunidad") ?? destinations[1];
const budinTrail = destinations.find((destination) => destination.id === "budin-trail") ?? destinations[2];
const basilica = destinations.find((destination) => destination.id === "basilica-st-michael") ?? destinations[0];

const pickupPoint = {
  label: casaComunidad.name,
  latitude: casaComunidad.latitude,
  longitude: casaComunidad.longitude
};

const destinationPoint = {
  label: budinTrail.name,
  latitude: budinTrail.latitude,
  longitude: budinTrail.longitude
};

const driverStartPoint = {
  label: "Driver near " + basilica.name,
  latitude: basilica.latitude,
  longitude: basilica.longitude
};

export function TransportRequestClient() {
  const [selected, setSelected] = useState(vehiclePackages[0].id);
  const [tripStyle, setTripStyle] = useState(tripStyles[0]);
  const [status, setStatus] = useState("Choose ride");
  const vehicle = useMemo(() => vehiclePackages.find((entry) => entry.id === selected) ?? vehiclePackages[0], [selected]);
  const isActive = status !== "Choose ride";

  function submitRide() {
    setStatus("Driver matching");
    window.localStorage.setItem(
      "lakbay-demo-ride-request",
      JSON.stringify({ vehicle: vehicle.name, route: vehicle.route, tripStyle, status: "Driver matching" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="space-y-5">
        <LiveRouteTracker
          title="Sakay live route tracker"
          roleLabel="Ride-hailing map"
          movingLabel="Driver current location"
          origin={driverStartPoint}
          destination={isActive ? destinationPoint : pickupPoint}
          active={isActive}
        />

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-green">Pickup</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{pickupPoint.label}</p>
          </div>
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-blue">Drop-off</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{destinationPoint.label}</p>
          </div>
          <div className="rounded-[1.25rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-lakbay-clay">Ride status</p>
            <p className="mt-2 text-sm font-black text-lakbay-deep">{status}</p>
          </div>
        </div>
      </section>

      <aside className="local-card rounded-[1.5rem] p-5 lg:sticky lg:top-24 lg:self-start">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Sakay booking</p>
            <h2 className="mt-4 text-3xl font-black text-lakbay-deep">Book a ride</h2>
          </div>
          <div className="rounded-full bg-lakbay-blue px-4 py-2 text-xs font-black text-white">Live ETA</div>
        </div>

        <div className="mt-5 rounded-[1.25rem] border border-lakbay-green/15 bg-white p-4 shadow-sm">
          <div className="grid gap-4">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">From</span>
              <input defaultValue="Casa Comunidad" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">To</span>
              <input defaultValue="Budin and Pasalubong Trail" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
            </label>
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-black text-slate-700">Trip style</span>
          <select value={tripStyle} onChange={(event) => setTripStyle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green">
            {tripStyles.map((style) => <option key={style}>{style}</option>)}
          </select>
        </label>

        <div className="mt-5 space-y-3">
          <p className="text-sm font-black text-slate-700">Choose ride</p>
          {vehiclePackages.slice(0, 4).map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelected(entry.id)}
              className={`w-full rounded-[1.15rem] border p-4 text-left transition ${selected === entry.id ? "border-lakbay-blue bg-lakbay-blue text-white" : "border-slate-200 bg-white text-lakbay-deep hover:border-lakbay-green"}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-black">{entry.name}</span>
                <span className="text-xs font-black">{entry.capacity}</span>
              </span>
              <span className={`mt-1 block text-xs font-semibold ${selected === entry.id ? "text-white/75" : "text-lakbay-deep/55"}`}>{entry.priceMode}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Passengers</span>
            <input defaultValue="3" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
          </label>
          <label className="block">
            <span className="text-sm font-black text-slate-700">Pickup time</span>
            <input defaultValue="Now" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-lakbay-green" />
          </label>
        </div>

        <div className="mt-5 rounded-[1.25rem] bg-lakbay-gold/15 p-4">
          <p className="text-sm font-black text-lakbay-deep">{vehicle.name}</p>
          <p className="mt-1 text-sm leading-6 text-lakbay-deep/65">{vehicle.route}</p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-lakbay-green">Reward: {vehicle.routeBadge}</p>
        </div>

        <button onClick={submitRide} className="mt-5 w-full rounded-full bg-lakbay-blue px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-green">
          {isActive ? "Update ride request" : "Find nearby driver"}
        </button>
      </aside>
    </div>
  );
}
