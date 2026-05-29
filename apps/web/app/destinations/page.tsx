import Link from "next/link";
import { destinations } from "@/features/destinations/data";

export default function DestinationsPage() {
  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-green">Destination directory</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Curated Tayabas routes and local stops.</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">Each destination can hold stories, QR content, tourist tips, nearby merchants, and LocalPass rewards.</p>
          </div>
          <Link href="/qr" className="rounded-full bg-lakbay-green px-6 py-4 text-center text-sm font-black text-white shadow-soft transition hover:bg-slate-950">
            Try QR check in
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article key={destination.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-lakbay-green">{destination.category}</span>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">+{destination.points} pts</span>
              </div>
              <h2 className="mt-5 text-2xl font-black text-slate-950">{destination.name}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-500">{destination.barangay}</p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{destination.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{tag}</span>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">QR Code</p>
                <p className="mt-2 font-mono text-sm font-bold text-slate-700">{destination.qrCode}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
