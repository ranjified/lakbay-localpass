import { TransportRequestClient } from "@/components/flows/transport-request-client";
import { rideRequests, vehiclePackages } from "@/lib/mock-data";

export default function TransportPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero mb-8 rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Sakay Tayabas</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Turn local rides into Tayabas route packages.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">Tourists request local transport through tourism packages like heritage loops, terminal pickups, and family van tours.</p>
          </div>
        </div>
        <TransportRequestClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {vehiclePackages.map((vehicle) => (
            <article key={vehicle.id} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{vehicle.vehicleType}</p>
              <h2 className="mt-4 text-xl font-black text-lakbay-deep">{vehicle.name}</h2>
              <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{vehicle.route}</p>
              <p className="mt-4 rounded-xl bg-lakbay-gold/15 p-3 text-sm font-bold text-lakbay-green">Badge: {vehicle.routeBadge}</p>
            </article>
          ))}
        </section>
        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Transport provider ride queue</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {rideRequests.map((request) => (
              <article key={request.id} className="route-ticket rounded-xl p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{request.status}</p>
                <h3 className="mt-2 text-lg font-black text-lakbay-deep">{request.package}</h3>
                <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{request.pickup} to {request.destination} for {request.passengers} pax</p>
                <div className="mt-4 flex gap-2">
                  {["Accept", "Arrived", "Completed"].map((action) => (
                    <button key={action} className="rounded-full bg-white px-3 py-2 text-xs font-black text-lakbay-deep shadow-sm">{action}</button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
