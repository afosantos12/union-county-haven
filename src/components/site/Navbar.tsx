import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo-mdrg.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/buy", label: "Buy" },
  { to: "/sell", label: "Sell" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Our Team" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

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
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-card-soft"
          : "bg-gradient-to-b from-black/40 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Michelle David Realty Group home">
          <img
            src={logo}
            alt="Michelle David Realty Group"
            width={1172}
            height={274}
            className={`h-10 w-auto md:h-12 transition-all duration-300 ${
              scrolled ? "" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
              activeProps={{ style: { color: "var(--gold)" } }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+19082766299"
            className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold ${
              scrolled ? "text-foreground" : "text-white"
            }`}
          >
            <Phone className="h-4 w-4" />
            (908) 276-6299
          </a>
          <Link
            to="/sell"
            className="rounded-sm border border-gold bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:bg-transparent hover:text-gold"
          >
            Home Valuation
          </Link>
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
            <Link
              to="/sell"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-sm bg-gold px-5 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gold-foreground"
            >
              Free Home Valuation
            </Link>
            <a href="tel:+19082766299" className="mt-2 flex items-center justify-center gap-2 py-2 text-sm text-foreground">
              <Phone className="h-4 w-4" /> (908) 276-6299
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
