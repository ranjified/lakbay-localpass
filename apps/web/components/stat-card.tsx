import type { DashboardStat } from "@/lib/types";

export function StatCard({ stat }: { stat: DashboardStat }) {
  return (
    <article className="local-card rounded-[1.1rem] p-5">
      <p className="text-sm font-semibold text-lakbay-clay">{stat.label}</p>
      <p className="mt-3 text-3xl font-black text-lakbay-deep">{stat.value}</p>
      <p className="mt-2 text-sm text-lakbay-deep/60">{stat.hint}</p>
    </article>
  );
}
