import type { DashboardStat } from "@/lib/types";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
      <p className="mt-3 text-3xl font-black text-slate-950">{stat.value}</p>
      <p className="mt-2 text-sm text-slate-500">{stat.hint}</p>
    </article>
  );
}
