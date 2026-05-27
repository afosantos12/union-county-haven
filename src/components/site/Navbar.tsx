import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/", label: "Buy" },
  { to: "/", label: "Sell" },
  { to: "/", label: "Neighborhoods" },
  { to: "/", label: "About" },
  { to: "/", label: "Journal" },
  { to: "/", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border shadow-card-soft"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm gradient-navy text-gold font-serif text-lg">
            M
          </span>
          <span className={`flex flex-col leading-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            <span className="font-serif text-base sm:text-lg">Michelle David</span>
            <span className="eyebrow !text-[0.6rem]" style={{ color: "var(--gold)" }}>
              Realty Group
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                scrolled ? "text-foreground/80" : "text-white/85"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+19085550100"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" />
            (908) 555-0100
          </a>
          <a
            href="#valuation"
            className="rounded-sm border border-gold bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:bg-transparent hover:text-gold"
          >
            Home Valuation
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#valuation"
              className="mt-3 rounded-sm bg-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gold-foreground"
            >
              Free Home Valuation
            </a>
            <a href="tel:+19085550100" className="mt-2 flex items-center justify-center gap-2 py-2 text-sm text-foreground">
              <Phone className="h-4 w-4" /> (908) 555-0100
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
