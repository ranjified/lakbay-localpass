import { MobileDemoClient } from "@/components/mobile-demo-client";

export default function MobilePage() {
  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-lakbay-cream p-8 shadow-soft md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-lakbay-green">PWA mobile app demo</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Every role gets a different mobile app experience.</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">This page previews the mobile screens for tourists, merchants, guides, transport providers, accommodation owners, event organizers, tourism staff, and admin.</p>
        </div>
        <MobileDemoClient />
      </section>
    </main>
  );
}
