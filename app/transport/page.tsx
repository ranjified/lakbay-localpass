import { TransportRequestClient } from "@/components/flows/transport-request-client";
import { rideRequests, vehiclePackages } from "@/lib/mock-data";

export default function TransportPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-lakbay-cream p-8 shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-green">Sakay Tayabas</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Vehicle request demo</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Tourists request local transport through tourism packages like heritage loops, terminal pickups, and family van tours.</p>
        </div>
        <TransportRequestClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {vehiclePackages.map((vehicle) => (
            <article key={vehicle.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{vehicle.vehicleType}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{vehicle.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{vehicle.route}</p>
              <p className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-lakbay-green">Badge: {vehicle.routeBadge}</p>
            </article>
          ))}
        </section>
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-950">Transport provider ride queue</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {rideRequests.map((request) => (
              <article key={request.id} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">{request.status}</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{request.package}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{request.pickup} to {request.destination} for {request.passengers} pax</p>
                <div className="mt-4 flex gap-2">
                  {["Accept", "Arrived", "Completed"].map((action) => (
                    <button key={action} className="rounded-full bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-sm">{action}</button>
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
