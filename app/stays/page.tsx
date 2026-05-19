import { StayBookingClient } from "@/components/flows/stay-booking-client";
import { stayBookings, stayRooms } from "@/lib/mock-data";

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
          {stayRooms.map((stay) => (
            <article key={stay.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{stay.stayType}</p>
              <h2 className="mt-3 text-xl font-black text-slate-950">{stay.property}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{stay.roomType}</p>
              <p className="mt-4 text-2xl font-black text-slate-950">{stay.rate}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {stay.matchTags.map((tag) => <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>)}
              </div>
            </article>
          ))}
        </section>
        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-950">Accommodation owner booking inbox</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {stayBookings.map((booking) => (
              <article key={booking.id} className="rounded-3xl bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">{booking.status}</p>
                <h3 className="mt-2 text-lg font-black text-slate-950">{booking.guest}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{booking.property} - {booking.dates}</p>
                <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow-sm">{booking.action}</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
