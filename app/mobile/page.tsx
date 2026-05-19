import { MobileDemoClient } from "@/components/mobile-demo-client";

export default function MobilePage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="heritage-hero mb-8 rounded-[1.5rem] p-8 text-white shadow-soft md:p-10">
          <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-gold">PWA mobile app demo</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">A pocket pass for every Tayabas role.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">This page previews the mobile screens for tourists, merchants, guides, transport providers, accommodation owners, event organizers, tourism staff, and admin.</p>
          </div>
        </div>
        <MobileDemoClient />
      </section>
    </main>
  );
}
