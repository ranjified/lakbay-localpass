import Link from "next/link";
import { roleExperiences, roleOrder, serviceModules } from "@/lib/mock-data";

export default function ServicesPage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-soft md:p-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">Lakbay LocalPass service demo</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">One tourism super app, many user experiences.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">This demo shows how tourists book stays, request vehicles, order food, join tours, follow events, and how each provider sees a unique dashboard.</p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceModules.map((module) => (
            <article key={module.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{module.name}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500">{module.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {module.roles.map((role) => (
                  <span key={role} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{role}</span>
                ))}
              </div>
              <Link href={module.href} className="mt-5 inline-flex rounded-full bg-lakbay-green px-4 py-3 text-sm font-black text-white transition hover:bg-slate-950">Open module</Link>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-slate-950">User access matrix</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {roleOrder.map((role) => {
              const experience = roleExperiences[role];
              return (
                <article key={role} className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">{experience.colorTag}</p>
                  <h3 className="mt-2 text-lg font-black text-slate-950">{experience.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{experience.dashboardName}</p>
                  <div className="mt-4 space-y-2">
                    {experience.quickActions.slice(0, 3).map((action) => (
                      <Link key={action.label} href={action.href} className="block rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:text-lakbay-green">{action.label}</Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
