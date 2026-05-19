import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/food", label: "Food" },
  { href: "/stays", label: "Stays" },
  { href: "/transport", label: "Sakay" },
  { href: "/mobile", label: "Mobile" },
  { href: "/dashboard", label: "Dashboards" }
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-black text-slate-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lakbay-green text-white shadow-soft">LP</span>
          <span className="leading-tight">
            Lakbay LocalPass
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-lakbay-green">Tayabas</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/login" className="rounded-full bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-lakbay-green">
          Demo Login
        </Link>
      </nav>
    </header>
  );
}
