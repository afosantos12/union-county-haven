import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-mdrg.png";

const exploreLinks = [
  { to: "/buy", label: "Buy" },
  { to: "/sell", label: "Sell" },
  { to: "/neighborhoods", label: "Neighborhoods" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="gradient-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <Link to="/" aria-label="Michelle David Realty Group home">
            <img
              src={logo}
              alt="Michelle David Realty Group"
              width={1172}
              height={274}
              className="h-14 w-auto"
              loading="lazy"
            />
          </Link>
          <p className="mt-6 max-w-sm text-sm text-white/70">
            Boutique luxury real estate serving Union County, New Jersey — and the families
            who call it home.
          </p>
          <div className="mt-8 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/15 text-white/80 transition-colors hover:border-gold hover:text-gold"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <h4 className="eyebrow">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <span>
                632 Boulevard
                <br />
                Kenilworth, NJ 07033
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:+19082766299" className="hover:text-gold">
                (908) 276-6299
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" />
              <a href="mailto:michelle@michelledavidgroup.com" className="hover:text-gold">
                michelle@michelledavidgroup.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Michelle David Realty Group. All rights reserved.</p>
          <p className="text-white/40">
            Equal Housing Opportunity · Licensed in the State of New Jersey
          </p>
        </div>
      </div>
    </footer>
  );
}
