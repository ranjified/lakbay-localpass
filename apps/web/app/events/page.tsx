import Link from "next/link";
import { EventTripBuilderClient } from "@/components/flows/event-trip-builder-client";
import { events } from "@/features/events/data";

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
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero rounded-[1.5rem] p-8 text-white shadow-soft md:p-12">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Event Trip Builder</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">Every event becomes a local spending trail.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">Event organizers can publish an event, connect food, rides, stays, guide packages, QR challenges, and see visitor interest.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <section className="grid gap-5">
            {events.map((event) => (
              <article key={event.id} className="local-card rounded-[1.25rem] p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{event.date}</p>
                    <h2 className="mt-4 text-2xl font-black text-lakbay-deep">{event.title}</h2>
                    <p className="mt-2 text-sm font-bold text-lakbay-clay">{event.venue}</p>
                    <p className="mt-4 text-sm leading-6 text-lakbay-deep/60">{event.description}</p>
                  </div>
                  <Link href="/mobile" className="rounded-full bg-lakbay-fiesta px-5 py-3 text-center text-sm font-black text-white transition hover:bg-lakbay-deep">Mobile event view</Link>
                </div>
              </article>
            ))}
          </section>

          <aside className="local-card rounded-[1.25rem] p-6">
            <h2 className="text-2xl font-black text-lakbay-deep">Organizer tools</h2>
            <div className="mt-5 space-y-3">
              {eventAddOns.map((item) => (
                <div key={item} className="route-ticket rounded-xl px-4 py-3 text-sm font-bold text-lakbay-deep">{item}</div>
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
