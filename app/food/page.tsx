import { FoodOrderClient } from "@/components/flows/food-order-client";
import { foodItems } from "@/lib/experience-data";

export default function FoodPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-lakbay-cream p-8 shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-green">Taste Trail</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Food and pasalubong ordering demo</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Tourists preorder meals, pasalubong, and bundles. Merchants receive a clear preparation queue with LocalPass rewards and route tags.</p>
        </div>
        <FoodOrderClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {foodItems.map((item) => (
            <article key={item.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{item.category}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{item.name}</h2>
              <p className="mt-2 text-sm text-slate-500">{item.shop}</p>
              <p className="mt-4 text-2xl font-black text-slate-950">{item.price}</p>
              <p className="mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-lakbay-green">{item.localPassReward}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
