import { StayBookingClient } from "@/components/flows/stay-booking-client";
import { stayBookings, stayRooms } from "@/features/stays/data";

export default function StaysPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero mb-8 rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Stay Match</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Match each traveler to the right Tayabas stay.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">Visitors send booking inquiries while hosts manage room availability, check-in guides, and add-on recommendations.</p>
          </div>
        </div>
        <StayBookingClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {stayRooms.map((stay) => (
            <article key={stay.id} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{stay.stayType}</p>
              <h2 className="mt-4 text-xl font-black text-lakbay-deep">{stay.property}</h2>
              <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{stay.roomType}</p>
              <p className="mt-4 text-2xl font-black text-lakbay-clay">{stay.rate}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stay.matchTags.map((tag) => <span key={tag} className="rounded-full bg-lakbay-gold/15 px-3 py-1 text-xs font-bold text-lakbay-clay">{tag}</span>)}
              </div>
            </article>
          ))}
        </section>
        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Accommodation owner booking inbox</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {stayBookings.map((booking) => (
              <article key={booking.id} className="route-ticket rounded-xl p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{booking.status}</p>
                <h3 className="mt-2 text-lg font-black text-lakbay-deep">{booking.guest}</h3>
                <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{booking.property} - {booking.dates}</p>
                <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-lakbay-deep shadow-sm">{booking.action}</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
