import { TourRequestClient } from "@/components/flows/tour-request-client";
import { tourPackages, tourRequests } from "@/lib/mock-data";

export default function ToursPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero mb-8 rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Kwentong Gabay</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Book guides who carry the stories of the city.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">Guides receive structured tour requests and open story cards for each destination during the actual trip.</p>
          </div>
        </div>
        <TourRequestClient />
        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {tourPackages.map((tour) => (
            <article key={tour.id} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{tour.duration}</p>
              <h2 className="mt-4 text-xl font-black text-lakbay-deep">{tour.name}</h2>
              <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{tour.idealFor}</p>
              <div className="mt-4 space-y-2">
                {tour.storyCards.map((card) => <p key={card} className="route-ticket rounded-xl px-4 py-3 text-sm font-bold text-lakbay-deep">{card}</p>)}
              </div>
            </article>
          ))}
        </section>
        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Tour guide request queue</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {tourRequests.map((request) => (
              <article key={request.id} className="route-ticket rounded-xl p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{request.status}</p>
                <h3 className="mt-2 text-lg font-black text-lakbay-deep">{request.package}</h3>
                <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{request.group}, {request.groupSize} pax, meeting at {request.meetingPoint}</p>
                <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-black text-lakbay-deep shadow-sm">Open story kit</button>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
