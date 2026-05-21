import Link from "next/link";
import { LakbayLogo } from "@/components/lakbay-logo";

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
    <header className="sticky top-0 z-40 border-b border-lakbay-green/20 bg-[#fffaf0]/94 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="font-black text-lakbay-deep">
          <LakbayLogo markClassName="h-12 w-12" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-2 text-sm font-semibold text-lakbay-deep/70 transition hover:bg-lakbay-gold/20 hover:text-lakbay-blue">
              {link.label}
            </Link>
          ))}
        </div>
        <Link href="/login" className="rounded-full bg-lakbay-blue px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:bg-lakbay-green">
          Demo Login
        </Link>
      </nav>
    </header>
  );
}
