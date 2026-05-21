import Link from "next/link";
import { destinations } from "@/lib/mock-data";

const mapCenter = {
  latitude: 14.0251,
  longitude: 121.5929
};

const mapBounds = {
  west: 121.5848,
  south: 14.0178,
  east: 121.6126,
  north: 14.0374
};

const tayabasMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds.west}%2C${mapBounds.south}%2C${mapBounds.east}%2C${mapBounds.north}&layer=mapnik&marker=${mapCenter.latitude}%2C${mapCenter.longitude}`;
const tayabasMapLink = `https://www.openstreetmap.org/?mlat=${mapCenter.latitude}&mlon=${mapCenter.longitude}#map=15/${mapCenter.latitude}/${mapCenter.longitude}`;

export default function MapPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-green">Tayabas Local Map</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Actual map view for LocalPass routes.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              Explore Tayabas through a live OpenStreetMap viewport centered on the Poblacion heritage loop, with LocalPass stops tied to their real latitude and longitude.
            </p>
          </div>
          <a
            href={tayabasMapLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-lakbay-blue px-5 py-3 text-sm font-black text-white shadow-soft transition hover:bg-lakbay-green"
          >
            Open full map
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="overflow-hidden rounded-[2rem] border border-lakbay-green/20 bg-white shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-lakbay-green/10 bg-lakbay-cream px-5 py-4">
              <div>
                <h2 className="text-base font-black text-slate-950">Tayabas City, Quezon</h2>
                <p className="text-sm text-slate-600">Live street map with LocalPass route context</p>
              </div>
              <p className="rounded-full bg-white px-3 py-1 text-xs font-black text-lakbay-green shadow-sm">
                {destinations.length} mapped stops
              </p>
            </div>

            <div className="relative min-h-[560px] bg-slate-100">
              <iframe
                title="OpenStreetMap map of Tayabas City, Quezon"
                src={tayabasMapUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="pointer-events-none absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/60 bg-white/92 p-4 shadow-soft backdrop-blur md:inset-x-6 md:bottom-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-black text-slate-950">Suggested LocalPass loop</p>
                    <p className="mt-1 text-sm text-slate-600">Basilica, Casa Comunidad, Budin Trail, Food Loop, and pilgrim route connector.</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-lakbay-green px-3 py-1 text-xs font-black text-white">Heritage</span>
                    <span className="rounded-full bg-lakbay-gold px-3 py-1 text-xs font-black text-lakbay-deep">Food</span>
                    <span className="rounded-full bg-lakbay-blue px-3 py-1 text-xs font-black text-white">Route</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-[1.5rem] border border-lakbay-green/20 bg-white p-5 shadow-soft">
              <h2 className="font-black text-slate-950">Map coordinates</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                These stops use actual coordinate fields from the app data, so tourism staff can later swap in verified city GIS entries without changing the map layout.
              </p>
            </section>

            {destinations.map((destination, index) => {
              const destinationMapLink = `https://www.openstreetmap.org/?mlat=${destination.latitude}&mlon=${destination.longitude}#map=17/${destination.latitude}/${destination.longitude}`;

              return (
                <article key={destination.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-soft">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lakbay-green font-black text-white">{index + 1}</span>
                    <div>
                      <h2 className="font-black text-slate-950">{destination.name}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {destination.category} in {destination.barangay}
                      </p>
                      <p className="mt-2 text-xs font-bold text-lakbay-blue">
                        {destination.latitude.toFixed(4)}, {destination.longitude.toFixed(4)}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{destination.description}</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        <a href={destinationMapLink} target="_blank" rel="noreferrer" className="text-sm font-black text-lakbay-green hover:text-slate-950">
                          Open exact pin
                        </a>
                        <Link href="/qr" className="text-sm font-black text-lakbay-blue hover:text-slate-950">
                          Check in with QR
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </aside>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <section className="rounded-[1.5rem] border border-lakbay-green/20 bg-white/90 p-5 shadow-soft">
            <p className="text-sm font-black text-slate-950">For tourists</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Plan a walkable heritage and food route before scanning LocalPass QR stops.</p>
          </section>
          <section className="rounded-[1.5rem] border border-lakbay-green/20 bg-white/90 p-5 shadow-soft">
            <p className="text-sm font-black text-slate-950">For guides</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Use the same map context when coordinating meeting points and story cards.</p>
          </section>
          <section className="rounded-[1.5rem] border border-lakbay-green/20 bg-white/90 p-5 shadow-soft">
            <p className="text-sm font-black text-slate-950">For tourism staff</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Replace demo entries with verified attractions, MSMEs, transport areas, and event venues.</p>
          </section>
        </div>
      </section>
    </main>
  );
}
