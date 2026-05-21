"use client";

import { useRouter } from "next/navigation";
import { roleOrder, roleProfiles } from "@/lib/mock-data";
import { demoAccountCredentials } from "@/lib/product-brief";
import type { UserRole } from "@/lib/types";

const storageKey = "lakbay-localpass-role";

export default function LoginPage() {
  const router = useRouter();
  const credentialsByEmail = new Map(demoAccountCredentials.map((credential) => [credential.email, credential]));

  function loginAs(role: UserRole) {
    window.localStorage.setItem(storageKey, role);
    router.push(role === "admin" ? "/admin" : "/dashboard");
  }

  return (
    <main className="lakbay-page min-h-[calc(100vh-73px)]">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="stamp-label rounded-full px-3 py-1 text-[10px] font-black tracking-[0.18em]">Demo login</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-lakbay-deep md:text-5xl">Choose a role and open its Tayabas desk.</h1>
          <p className="mt-4 text-base leading-7 text-lakbay-deep/65">
            This MVP uses role simulation for fast pitching. Supabase Auth can replace this screen once your Supabase project keys are added.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {roleOrder.map((role) => {
            const profile = roleProfiles[role];
            const credential = credentialsByEmail.get(profile.demoEmail);
            return (
              <button
                key={role}
                onClick={() => loginAs(role)}
                className="local-card rounded-[1.25rem] p-5 text-left transition hover:-translate-y-1 hover:border-lakbay-fiesta"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-lakbay-clay">{profile.label}</p>
                <h2 className="mt-3 text-xl font-black text-lakbay-deep">{profile.demoEmail}</h2>
                {credential ? (
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-lakbay-blue">
                    Password: {credential.password}
                  </p>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">{profile.headline}</p>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
