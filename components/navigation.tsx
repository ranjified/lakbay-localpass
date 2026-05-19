import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/food", label: "Food" },
  { href: "/stays", label: "Stays" },
  { href: "/transport", label: "Sakay" },
  { href: "/tours", label: "Tours" },
  { href: "/events", label: "Events" },
  { href: "/mobile", label: "Mobile" },
  { href: "/dashboard", label: "Dashboards" }
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-lakbay-clay/20 bg-[#fffaf0]/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-black text-lakbay-deep">
          <span className="flex h-11 w-11 rotate-[-3deg] items-center justify-center rounded-xl border-2 border-lakbay-gold bg-lakbay-deep text-sm text-lakbay-gold shadow-stamp">LP</span>
          <span className="leading-tight">
            Lakbay LocalPass
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-lakbay-clay">Tayabas route pass</span>
          </span>
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-semibold text-lakbay-deep/70 transition hover:bg-lakbay-gold/20 hover:text-lakbay-deep">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/login" className="rounded-full bg-lakbay-fiesta px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-lakbay-deep">
          Demo Login
        </Link>
      </nav>
    </header>
  );
}
