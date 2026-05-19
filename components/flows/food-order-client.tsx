"use client";

import { useMemo, useState } from "react";
import { products, tripStyles } from "@/lib/mock-data";

const orderModes = ["Pickup", "Pre-order", "Delivery request", "Dine-in reservation", "Pasalubong bundle reservation"];

export function FoodOrderClient() {
  const [selected, setSelected] = useState(products[0].id);
  const [mode, setMode] = useState(orderModes[0]);
  const [tripStyle, setTripStyle] = useState(tripStyles[1]);
  const [status, setStatus] = useState("Draft");
  const item = useMemo(() => products.find((entry) => entry.id === selected) ?? products[0], [selected]);

  function submitOrder() {
    setStatus("Pending merchant confirmation");
    window.localStorage.setItem(
      "lakbay-demo-food-order",
      JSON.stringify({ item: item.name, shop: item.shop, mode, tripStyle, status: "Pending merchant confirmation" })
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-lakbay-green">Tourist flow</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950">Order food or pasalubong</h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">Taste Trail lets visitors order local food in a way that supports route-based tourism. The tourist does not just buy; they complete a local food experience.</p>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="text-sm font-black text-slate-700">Choose product</span>
            <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {products.map((entry) => (
                <option key={entry.id} value={entry.id}>{entry.name} - {entry.shop}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Trip style</span>
            <select value={tripStyle} onChange={(event) => setTripStyle(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {tripStyles.map((style) => <option key={style}>{style}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Order type</span>
            <select value={mode} onChange={(event) => setMode(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green">
              {orderModes.map((entry) => <option key={entry}>{entry}</option>)}
            </select>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-slate-700">Quantity</span>
              <input defaultValue="2" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-slate-700">Preferred time</span>
              <input defaultValue="3:00 PM" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-black text-slate-700">Tourist note</span>
            <textarea defaultValue="Please prepare as pasalubong for pickup after our heritage walk." className="mt-2 min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold outline-none focus:border-lakbay-green" />
          </label>

          <button onClick={submitOrder} className="w-full rounded-full bg-lakbay-green px-6 py-4 text-sm font-black text-white shadow-soft transition hover:bg-slate-950">Submit food order demo</button>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft">
          <p className="text-sm font-bold text-lakbay-gold">Order preview</p>
          <h3 className="mt-3 text-2xl font-black">{item.name}</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-300">
            <p><strong className="text-white">Shop:</strong> {item.shop}</p>
            <p><strong className="text-white">Price:</strong> {item.price}</p>
            <p><strong className="text-white">Prep time:</strong> {item.prepTime}</p>
            <p><strong className="text-white">Pickup:</strong> {item.pickupPoint}</p>
            <p><strong className="text-white">Reward:</strong> {item.localPassReward}</p>
            <p><strong className="text-white">Status:</strong> {status}</p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h3 className="text-xl font-black text-slate-950">Merchant side</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="rounded-2xl bg-slate-50 p-4"><strong>New order alert:</strong> Merchant receives product, quantity, pickup time, and tourist note.</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>Status buttons:</strong> Confirm, Preparing, Ready for Pickup, Completed.</p>
            <p className="rounded-2xl bg-slate-50 p-4"><strong>Unique:</strong> The merchant can attach this product to {item.trailTag} and reward the tourist with LocalPass points.</p>
          </div>
        </section>
      </aside>
    </div>
  );
}
