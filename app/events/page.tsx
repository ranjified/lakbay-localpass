import Link from "next/link";
import { EventTripBuilderClient } from "@/components/flows/event-trip-builder-client";
import { events } from "@/lib/mock-data";

const eventAddOns = [
  "Recommended food and pasalubong bundles",
  "Route Buddy vehicle packages",
  "Nearby Stay Match listings",
  "QR challenge and event badge",
  "Merchant coupon bundle",
  "Visitor interest report"
];

export default function EventsPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Event Trip Builder</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Events become complete tourism journeys.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">Event organizers can publish an event, connect food, rides, stays, guide packages, QR challenges, and see visitor interest.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="grid gap-5">
            {events.map((event) => (
              <article key={event.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{event.date}</p>
                    <h2 className="mt-3 text-2xl font-black text-slate-950">{event.title}</h2>
                    <p className="mt-2 text-sm font-bold text-slate-500">{event.venue}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-500">{event.description}</p>
                  </div>
                  <Link href="/mobile" className="rounded-full bg-lakbay-green px-5 py-3 text-center text-sm font-black text-white transition hover:bg-slate-950">Mobile event view</Link>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">Organizer tools</h2>
            <div className="mt-5 space-y-3">
              {eventAddOns.map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">{item}</div>
              ))}
            </div>
          </aside>
        </div>

        <section className="mt-8">
          <EventTripBuilderClient />
        </section>
      </section>
    </main>
  );
}
