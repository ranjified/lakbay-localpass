import Link from "next/link";
import { businesses, destinations, events } from "@/lib/mock-data";

const modules = [
  "Interactive tourism map",
  "QR heritage storytelling",
  "Local food and pasalubong marketplace",
  "Ride, tour, and stay inquiry flow",
  "LocalPass points, coupons, and badges",
  "Role based dashboards for every stakeholder"
];

export default function HomePage() {
  return (
    <main className="lakbay-page">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-70 demo-map-grid" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="stamp-label rounded-full px-4 py-2 text-xs font-black tracking-[0.24em]">Tayabas Tourism Super App Demo</p>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-lakbay-deep md:text-6xl">
              Carry Tayabas in one local route pass.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-lakbay-deep/72">
              Lakbay LocalPass feels like a digital tourism desk for the city: QR stories at heritage stops, food and pasalubong orders, guide requests, ride loops, stays, events, and role-based operations for local partners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="rounded-full bg-lakbay-fiesta px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-lakbay-deep">
                Try demo login
              </Link>
              <Link href="/services" className="rounded-full border border-lakbay-clay/30 bg-[#fffaf0] px-6 py-4 text-center text-sm font-black text-lakbay-deep transition hover:border-lakbay-fiesta hover:text-lakbay-fiesta">
                Open service demos
              </Link>
            </div>
            <div className="route-line mt-10 h-3 max-w-xl" />
          </div>

          <div className="local-card rotate-[1deg] rounded-[1.5rem] p-5 backdrop-blur">
            <div className="heritage-hero rounded-[1.25rem] p-5 text-white">
              <div className="relative z-10">
              <p className="text-sm font-bold text-lakbay-gold">LocalPass route wallet</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                  <p className="text-3xl font-black">{destinations.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Destinations</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                  <p className="text-3xl font-black">{businesses.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Partners</p>
                </div>
                <div className="rounded-xl border border-white/15 bg-white/10 p-4">
                  <p className="text-3xl font-black">{events.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Events</p>
                </div>
              </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {modules.map((module) => (
                <div key={module} className="route-ticket rounded-xl px-4 py-3 text-sm font-bold text-lakbay-deep">
                  {module}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="heritage-hero rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-gold">Demo journeys</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">Book, ride, order, scan, and manage from one platform.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {[
              ["Taste Trail", "/food"],
              ["Stay Match", "/stays"],
              ["Sakay Tayabas", "/transport"],
              ["Kwentong Gabay", "/tours"],
              ["Mobile Demo", "/mobile"]
            ].map(([label, href]) => (
              <Link key={label} href={href} className="rounded-2xl bg-white/10 px-4 py-4 text-center text-sm font-black text-white transition hover:bg-white hover:text-slate-950">
                {label}
              </Link>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Traveler</p>
            <h2 className="mt-4 text-2xl font-black text-lakbay-deep">For tourists</h2>
            <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">Plan routes, scan QR codes, unlock stories, collect rewards, and find food, pasalubong, rides, tours, and stays.</p>
          </article>
          <article className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Local trade</p>
            <h2 className="mt-4 text-2xl font-black text-lakbay-deep">For local partners</h2>
            <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">Merchants, guides, transport providers, accommodations, and event organizers get simple dashboards for visibility and inquiries.</p>
          </article>
          <article className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">City desk</p>
            <h2 className="mt-4 text-2xl font-black text-lakbay-deep">For tourism office</h2>
            <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">Manage destination content, QR stories, listings, events, approvals, and analytics from one city tourism console.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
