import { Instagram, Facebook, Linkedin, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="gradient-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-gold/40 text-gold font-serif">
              M
            </span>
            <div>
              <div className="font-serif text-xl">Michelle David</div>
              <div className="eyebrow !text-[0.6rem]">Realty Group</div>
            </div>
          </div>
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
            {["Buy", "Sell", "Featured Listings", "Neighborhoods", "Market Insights", "About"].map(
              (l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-gold">
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              <span>
                500 North Avenue
                <br />
                Kenilworth, NJ 07033
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold" />
              <a href="tel:+19085550100" className="hover:text-gold">
                (908) 555-0100
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold" />
              <a href="mailto:hello@michelledavidrealty.com" className="hover:text-gold">
                hello@michelledavidrealty.com
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
