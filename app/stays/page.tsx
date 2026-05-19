import { StayBookingClient } from "@/components/flows/stay-booking-client";
import { stayOptions } from "@/lib/experience-data";

export default function StaysPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-lakbay-cream p-8 shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-green">Stay Match</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Stay Tayabas booking demo</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Visitors send booking inquiries while hosts manage room availability, check-in guides, and add-on recommendations.</p>
        </div>
        <StayBookingClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {stayOptions.map((stay) => (
            <article key={stay.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{stay.stayType}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{stay.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{stay.bestFor}</p>
              <p className="mt-4 text-2xl font-black text-slate-950">{stay.rate}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stay.matchTags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}
              </div>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
