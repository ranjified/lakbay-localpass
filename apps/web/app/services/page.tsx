import Link from "next/link";
import { keyMetrics, roleExperiences, roleOrder, serviceModules, validationGroups } from "@/features/services/data";

export default function ServicesPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero rounded-[1.5rem] p-8 text-white shadow-soft md:p-12">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Lakbay LocalPass service demo</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">A city tourism desk with bookable local routes.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">Each module is shaped around Tayabas visitor movement: discover a stop, scan a story, spend locally, and let the right role manage the request.</p>
          </div>
        </div>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="local-card rounded-[1.25rem] p-6">
            <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">MVP demo rule</p>
            <h2 className="mt-4 text-2xl font-black text-lakbay-deep">Simulate the expensive parts, prove the local flow.</h2>
            <p className="mt-3 text-sm leading-6 text-lakbay-deep/65">
              Payments, delivery logistics, real-time ride dispatch, AI recommendations, and rewards redemption stay as inquiry/status demos first. The pitch focuses on discovery, QR stories, local spending, requests, dashboards, and seeded Tayabas data.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {keyMetrics.slice(0, 6).map((metric) => (
              <article key={metric.label} className="route-ticket rounded-xl p-4">
                <h3 className="text-sm font-black text-lakbay-deep">{metric.label}</h3>
                <p className="mt-2 text-xs leading-5 text-lakbay-deep/60">{metric.whyItMatters}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceModules.map((module) => (
            <article key={module.name} className="local-card rounded-[1.25rem] p-6">
              <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">{module.name}</p>
              <p className="mt-4 text-sm leading-6 text-lakbay-deep/65">{module.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.roles.map((role) => (
                  <span key={role} className="rounded-full bg-lakbay-gold/15 px-3 py-1 text-xs font-bold text-lakbay-clay">{role}</span>
                ))}
              </div>
              <Link href={module.href} className="mt-5 inline-flex rounded-full bg-lakbay-green px-4 py-3 text-sm font-black text-white transition hover:bg-lakbay-fiesta">Open module</Link>
            </article>
          ))}
        </div>

        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">User access matrix</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roleOrder.map((role) => {
              const experience = roleExperiences[role];
              return (
                <article key={role} className="route-ticket rounded-xl p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{experience.colorTag}</p>
                  <h3 className="mt-2 text-lg font-black text-lakbay-deep">{experience.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-lakbay-deep/60">{experience.dashboardName}</p>
                  <div className="mt-4 space-y-2">
                    {experience.quickActions.slice(0, 3).map((action) => (
                      <Link key={action.label} href={action.href} className="block rounded-xl bg-white/80 px-4 py-3 text-sm font-bold text-lakbay-deep transition hover:text-lakbay-fiesta">{action.label}</Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="local-card mt-8 rounded-[1.25rem] p-6">
          <h2 className="text-2xl font-black text-lakbay-deep">Validation plan from the product brief</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {validationGroups.map((group) => (
              <article key={group.group} className="route-ticket rounded-xl p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-lakbay-clay">{group.targetCount} targets</p>
                <h3 className="mt-2 text-base font-black text-lakbay-deep">{group.group}</h3>
                <p className="mt-2 text-xs font-bold text-lakbay-blue">{group.method}</p>
                <p className="mt-2 text-xs leading-5 text-lakbay-deep/60">{group.keyQuestion}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
