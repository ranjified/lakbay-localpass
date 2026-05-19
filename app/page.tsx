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
    <main>
      <section className="relative overflow-hidden bg-lakbay-cream">
        <div className="absolute inset-0 opacity-50 demo-map-grid" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-lakbay-green">Tayabas Tourism Super App Demo</p>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
              Discover Tayabas, support local, and reward every visit.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Lakbay LocalPass is a working MVP concept for tourism discovery, QR based heritage storytelling, local business visibility, booking inquiries, and user specific dashboards.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="rounded-full bg-lakbay-green px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-slate-950">
                Try demo login
              </Link>
              <Link href="/services" className="rounded-full border border-slate-300 bg-white px-6 py-4 text-center text-sm font-black text-slate-800 transition hover:border-lakbay-green hover:text-lakbay-green">
                Open service demos
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/90 p-5 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <p className="text-sm font-bold text-lakbay-gold">MVP snapshot</p>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{destinations.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Destinations</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{businesses.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Partners</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-black">{events.length}</p>
                  <p className="mt-1 text-xs text-slate-300">Events</p>
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {modules.map((module) => (
                <div key={module} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  {module}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft md:p-10">
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">For tourists</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Plan routes, scan QR codes, unlock stories, collect rewards, and find food, pasalubong, rides, tours, and stays.</p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">For local partners</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Merchants, guides, transport providers, accommodations, and event organizers get simple dashboards for visibility and inquiries.</p>
          </article>
          <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black text-slate-950">For tourism office</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">Manage destination content, QR stories, listings, events, approvals, and analytics from one city tourism console.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
