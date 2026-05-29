import type { DemoRequest } from "@/features/dashboard/data";

export function RequestStatusCard({ request }: { request: DemoRequest }) {
  return (
    <article className="route-ticket rounded-xl p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-clay">{request.kind}</p>
          <h3 className="mt-2 text-lg font-black text-lakbay-deep">{request.provider}</h3>
        </div>
        <span className="rounded-full bg-lakbay-gold/20 px-3 py-1 text-xs font-black text-lakbay-clay">{request.status}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-lakbay-deep/60">{request.detail}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-lakbay-clay/70">Request ID {request.id}</p>
    </article>
  );
}
