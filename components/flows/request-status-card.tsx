import type { DemoRequest } from "@/lib/experience-data";

export function RequestStatusCard({ request }: { request: DemoRequest }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-lakbay-green">{request.kind}</p>
          <h3 className="mt-2 text-lg font-black text-slate-950">{request.provider}</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-lakbay-green">{request.status}</span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{request.detail}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Request ID {request.id}</p>
    </article>
  );
}
