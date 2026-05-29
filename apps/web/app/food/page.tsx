import { FoodOrderClient } from "@/components/flows/food-order-client";
import { foodOrders, products } from "@/features/marketplace/data";

export default function FoodPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero mb-8 rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Taste Trail</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Order budin, meals, and pasalubong from the route.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">Tourists preorder meals, pasalubong, and bundles. Merchants receive a preparation queue with LocalPass rewards and route tags.</p>
          </div>
        </div>
        <FoodOrderClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {products.map((item) => (
            <article key={item.id} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{item.category}</p>
              <h2 className="mt-4 text-xl font-black text-lakbay-deep">{item.name}</h2>
              <p className="mt-2 text-sm text-lakbay-deep/60">{item.shop}</p>
              <p className="mt-4 text-2xl font-black text-lakbay-clay">{item.price}</p>
              <p className="mt-3 rounded-xl bg-lakbay-gold/15 p-3 text-sm font-bold text-lakbay-green">{item.localPassReward}</p>
            </article>
          ))}
        </section>
        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Merchant incoming order queue</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {foodOrders.map((order) => (
              <article key={order.id} className="route-ticket rounded-xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{order.id}</p>
                    <h3 className="mt-2 text-lg font-black text-lakbay-deep">{order.items}</h3>
                    <p className="mt-1 text-sm text-lakbay-deep/60">{order.customer} - {order.mode}</p>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-lakbay-clay">{order.status}</span>
                </div>
                <p className="mt-4 rounded-xl bg-lakbay-gold/15 p-3 text-sm font-bold text-lakbay-green">Tourism Boost: attach to {order.routeTag}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
