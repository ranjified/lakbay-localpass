import Link from "next/link";
import { destinations } from "@/lib/mock-data";

export default function MapPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-green">Map MVP</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Interactive tourism map demo.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            This map view is intentionally API key free for demo deployment. It can later be upgraded to Leaflet, Mapbox, or Google Maps with real route layers.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-emerald-100 bg-emerald-50 shadow-soft demo-map-grid">
            <div className="absolute left-[18%] top-[18%] rounded-full bg-white p-3 shadow-soft ring-4 ring-lakbay-green/20">
              <p className="text-xs font-black text-lakbay-green">Basilica</p>
            </div>
            <div className="absolute left-[45%] top-[32%] rounded-full bg-white p-3 shadow-soft ring-4 ring-lakbay-gold/20">
              <p className="text-xs font-black text-amber-700">Casa</p>
            </div>
            <div className="absolute left-[62%] top-[56%] rounded-full bg-white p-3 shadow-soft ring-4 ring-lakbay-green/20">
              <p className="text-xs font-black text-lakbay-green">Budin Trail</p>
            </div>
            <div className="absolute left-[30%] top-[68%] rounded-full bg-white p-3 shadow-soft ring-4 ring-slate-300">
              <p className="text-xs font-black text-slate-700">Food Loop</p>
            </div>
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] bg-white/90 p-5 shadow-soft backdrop-blur">
              <p className="text-sm font-black text-slate-950">Suggested itinerary</p>
              <p className="mt-2 text-sm text-slate-600">Basilica to Casa Comunidad to Budin Trail to Food Loop. Estimated demo time: 2 to 3 hours.</p>
            </div>
          </section>

          <aside className="space-y-4">
            {destinations.map((destination, index) => (
              <article key={destination.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lakbay-green font-black text-white">{index + 1}</span>
                  <div>
                    <h2 className="font-black text-slate-950">{destination.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">{destination.category} in {destination.barangay}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{destination.description}</p>
                    <Link href="/qr" className="mt-3 inline-block text-sm font-black text-lakbay-green hover:text-slate-950">
                      Check in with QR
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}
