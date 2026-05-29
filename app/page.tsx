import Link from "next/link";
import { LakbayLogo } from "@/components/lakbay-logo";
import { businesses } from "@/features/marketplace/data";
import { destinations } from "@/features/destinations/data";
import { events } from "@/features/events/data";
import { demoStoryline, expectedImpact, problemPoints, valuePillars } from "@/features/product/data";

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
              <LakbayLogo inverted markClassName="h-11 w-11" />
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
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Problem-solution fit</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-lakbay-deep md:text-4xl">
              Built for Tayabas, not for generic travel.
            </h2>
            <p className="mt-4 text-sm leading-7 text-lakbay-deep/65">
              The product brief frames Lakbay LocalPass as a hyperlocal tourism platform that connects discovery, stories, MSME spending, ride requests, stays, and visitor insights in one pass.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {problemPoints.map((point) => (
              <article key={point.title} className="local-card rounded-[1.25rem] p-5">
                <h3 className="text-lg font-black text-lakbay-deep">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-lakbay-deep/65">{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          {valuePillars.map((pillar) => (
            <article key={pillar.title} className="route-ticket rounded-xl p-5">
              <h2 className="text-lg font-black text-lakbay-deep">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">{pillar.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="heritage-hero rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-gold">Demo journeys</p>
          <h2 className="mt-3 text-3xl font-black md:text-4xl">A six-scene walkthrough for pitch day.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {demoStoryline.map((step, index) => (
              <div key={step.scene} className="rounded-2xl bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-lakbay-gold">Scene {index + 1}</p>
                <h3 className="mt-2 text-lg font-black text-white">{step.scene}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-200">{step.summary}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {expectedImpact.slice(0, 6).map((item) => (
            <article key={item.beneficiary} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Expected impact</p>
              <h2 className="mt-4 text-2xl font-black text-lakbay-deep">{item.beneficiary}</h2>
              <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">{item.impact}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
