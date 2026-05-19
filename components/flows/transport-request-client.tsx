"use client";

import { useMemo, useState } from "react";
import { tripStyles, vehiclePackages } from "@/lib/mock-data";

export function TransportRequestClient() {
  const [selected, setSelected] = useState(vehiclePackages[0].id);
  const [tripStyle, setTripStyle] = useState(tripStyles[0]);
  const [status, setStatus] = useState("Draft");
  const vehicle = useMemo(() => vehiclePackages.find((entry) => entry.id === selected) ?? vehiclePackages[0], [selected]);

  function submitRide() {
    setStatus("Pending driver acceptance");
    window.localStorage.setItem(
      "lakbay-demo-ride-request",
      JSON.stringify({ vehicle: vehicle.name, route: vehicle.route, tripStyle, status: "Pending driver acceptance" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-lakbay-green">Tourist flow</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Grab a local vehicle</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">Sakay Tayabas focuses on tourism mobility: terminal pickups, heritage loops, food stopovers, and group transfers.</p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Trip style</span>
            <select value={tripStyle} onChange={(event) => setTripStyle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {tripStyles.map((style) => <option key={style}>{style}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Choose Route Buddy package</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {vehiclePackages.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.name} - {entry.vehicleType}</option>
              ))}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Pickup point</span>
              <input defaultValue="Casa Comunidad" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Destination</span>
              <input defaultValue="Budin and Pasalubong Trail" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Passengers</span>
              <input defaultValue="3" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Preferred time</span>
              <input defaultValue="4:30 PM" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Ride note</span>
            <textarea defaultValue="Please include a short pasalubong stopover. We have two small bags." className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
          </label>

          <button onClick={submitRide} className="w-full rounded-full bg-lakbay-green px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-slate-950">Request vehicle demo</button>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft">
          <p className="text-sm font-bold text-lakbay-gold">Route Buddy preview</p>
          <h3 className="mt-3 text-2xl font-black">{vehicle.name}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><strong className="text-white">Vehicle:</strong> {vehicle.vehicleType}</p>
            <p><strong className="text-white">Capacity:</strong> {vehicle.capacity}</p>
            <p><strong className="text-white">Route:</strong> {vehicle.route}</p>
            <p><strong className="text-white">Fare:</strong> {vehicle.priceMode}</p>
            <p><strong className="text-white">Status:</strong> {status}</p>
          </div>
          <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm text-white">Badge after ride: {vehicle.routeBadge}</p>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-black text-slate-950">Driver side</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="rounded-2xl bg-slate-50 p-4"><strong>Incoming ride:</strong> Driver sees pickup, destination, passenger count, route type, and notes.</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>Status buttons:</strong> Accept, Arrived, On Route, Completed.</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>Unique:</strong> Route Buddy packages create predictable tourism loops for local drivers.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}
