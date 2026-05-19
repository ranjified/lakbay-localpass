import { TourRequestClient } from "@/components/flows/tour-request-client";
import { tourPackages } from "@/lib/experience-data";

export default function ToursPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-lakbay-cream p-8 shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-green">Kwentong Gabay</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Tour guide booking demo</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Guides receive structured tour requests and open story cards for each destination during the actual trip.</p>
        </div>
        <TourRequestClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {tourPackages.map((tour) => (
            <article key={tour.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{tour.duration}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{tour.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{tour.idealFor}</p>
              <div className="mt-4 space-y-2">
                {tour.storyCards.map((card) => <p key={card} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">{card}</p>)}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
