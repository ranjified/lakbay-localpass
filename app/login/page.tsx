"use client";

import { useRouter } from "next/navigation";
import { roleOrder, roleProfiles } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";

const storageKey = "lakbay-localpass-role";

export default function LoginPage() {
  const router = useRouter();

  function loginAs(role: UserRole) {
    window.localStorage.setItem(storageKey, role);
    router.push(role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-lakbay-green">Demo login</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Choose a role and open its dynamic dashboard.</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            This MVP uses role simulation for fast pitching. Supabase Auth can replace this screen once your Supabase project keys are added.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roleOrder.map((role) => {
            const profile = roleProfiles[role];
            return (
              <button
                key={role}
                onClick={() => loginAs(role)}
                className="rounded-[2rem] border border-slate-200 bg-white p-5 text-left shadow-soft transition hover:-translate-y-1 hover:border-lakbay-green hover:bg-emerald-50"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-green">{profile.label}</p>
                <h2 className="mt-3 text-xl font-black text-slate-950">{profile.demoEmail}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-500">{profile.headline}</p>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
