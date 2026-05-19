"use client";

import { useEffect, useMemo, useState } from "react";
import { destinations } from "@/lib/mock-data";

const checkinKey = "lakbay-localpass-checkins";

type Checkin = {
  qrCode: string;
  name: string;
  points: number;
  date: string;
};

export default function QRPage() {
  const [code, setCode] = useState(destinations[0]?.qrCode ?? "");
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [message, setMessage] = useState("Select a demo QR code or type one manually.");

  useEffect(() => {
    const saved = window.localStorage.getItem(checkinKey);
    if (saved) {
      setCheckins(JSON.parse(saved) as Checkin[]);
    }
  }, []);

  const totalPoints = useMemo(() => checkins.reduce((sum, item) => sum + item.points, 0), [checkins]);

  function saveCheckins(nextCheckins: Checkin[]) {
    setCheckins(nextCheckins);
    window.localStorage.setItem(checkinKey, JSON.stringify(nextCheckins));
  }

  function checkIn() {
    const normalized = code.trim().toUpperCase();
    const destination = destinations.find((item) => item.qrCode === normalized);

    if (!destination) {
      setMessage("QR code not found in demo seed data.");
      return;
    }

    if (checkins.some((item) => item.qrCode === destination.qrCode)) {
      setMessage(`Already checked in at ${destination.name}. Story remains unlocked.`);
      return;
    }

    const nextCheckins = [
      {
        qrCode: destination.qrCode,
        name: destination.name,
        points: destination.points,
        date: new Date().toLocaleString()
      },
      ...checkins
    ];

    saveCheckins(nextCheckins);
    setMessage(`Unlocked ${destination.name}. You earned ${destination.points} LocalPass points.`);
  }

  function resetDemo() {
    saveCheckins([]);
    setMessage("LocalPass demo progress was reset.");
  }

  return (
    <main className="lakbay-page">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-soft md:p-8">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-gold">LocalPass QR</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">Scan, check in, and unlock heritage stories.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              This screen simulates the mobile QR experience. For the real mobile app, this can use camera scanning through a PWA scanner or Capacitor plugin.
            </p>

            <div className="mt-8 rounded-[1.5rem] bg-white p-5 text-slate-950">
              <label className="text-sm font-black text-slate-600">QR code</label>
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm font-bold outline-none ring-lakbay-green transition focus:ring-4"
                placeholder="LP-BASILICA-001"
              />
              <button onClick={checkIn} className="mt-4 w-full rounded-full bg-lakbay-green px-5 py-3 text-sm font-black text-white transition hover:bg-slate-950">
                Check in now
              </button>
              <button onClick={resetDemo} className="mt-3 w-full rounded-full border border-slate-200 px-5 py-3 text-sm font-black text-slate-700 transition hover:border-red-300 hover:text-red-600">
                Reset demo progress
              </button>
            </div>

            <div className="mt-6 rounded-[1.5rem] bg-white/10 p-5">
              <p className="text-sm font-bold text-slate-300">Status</p>
              <p className="mt-2 text-lg font-black text-white">{message}</p>
            </div>
          </section>

          <section>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-slate-500">Total points</p>
                <p className="mt-3 text-5xl font-black text-lakbay-green">{totalPoints}</p>
                <p className="mt-3 text-sm text-slate-500">Points are saved in browser local storage for this demo.</p>
              </article>
              <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <p className="text-sm font-bold text-slate-500">Visited stops</p>
                <p className="mt-3 text-5xl font-black text-slate-950">{checkins.length}</p>
                <p className="mt-3 text-sm text-slate-500">QR check ins can later sync to Supabase.</p>
              </article>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Demo QR codes</h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
                    onClick={() => setCode(destination.qrCode)}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-lakbay-green hover:bg-emerald-50"
                  >
                    <p className="font-black text-slate-950">{destination.name}</p>
                    <p className="mt-2 font-mono text-xs font-bold text-lakbay-green">{destination.qrCode}</p>
                    <p className="mt-2 text-xs font-bold text-amber-700">+{destination.points} points</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
              <h2 className="text-2xl font-black text-slate-950">Unlocked stories</h2>
              <div className="mt-5 space-y-3">
                {checkins.length === 0 && <p className="text-sm text-slate-500">No stories unlocked yet.</p>}
                {checkins.map((checkin) => {
                  const destination = destinations.find((item) => item.qrCode === checkin.qrCode);
                  return (
                    <article key={checkin.qrCode} className="rounded-2xl bg-slate-50 p-4">
                      <p className="font-black text-slate-950">{checkin.name}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{destination?.story}</p>
                      <p className="mt-2 text-xs font-bold text-slate-400">Checked in: {checkin.date}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
