import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { FeaturedListings } from "@/components/site/FeaturedListings";
import { Valuation } from "@/components/site/Valuation";
import heroBuy from "@/assets/hero-buy.jpg";
import { Search, MapPin, Compass } from "lucide-react";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy a Home in Union County, NJ | Michelle David Realty Group" },
      { name: "description", content: "Search luxury and family homes for sale in Westfield, Summit, Cranford, Kenilworth and across Union County, NJ with a boutique team that knows every block." },
      { property: "og:title", content: "Buy a Home in Union County, NJ" },
      { property: "og:description", content: "Curated listings and white-glove buyer representation across Union County." },
      { property: "og:image", content: heroBuy },
    ],
    links: [{ rel: "canonical", href: "/buy" }],
  }),
  component: BuyPage,
});

function BuyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Buyers"
        title={<>Find the home that <span className="italic text-gold">feels like yours</span></>}
        subtitle="Search every active listing across GSMLS, Jersey MLS, and Monmouth/Ocean MLS — paired with a boutique advisor who knows the towns block by block."
        image={heroBuy}
        imageAlt="Luxury New Jersey home at twilight with warm interior lights"
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col items-stretch gap-2 rounded-sm bg-card p-2 shadow-luxury md:flex-row"
          >
            <div className="flex flex-1 items-center gap-3 px-4 py-3">
              <MapPin className="h-5 w-5 shrink-0 text-navy/60" />
              <input
                type="text"
                placeholder="City, neighborhood, ZIP, or MLS #"
                className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
              />
            </div>
            <button className="flex items-center justify-center gap-2 rounded-sm bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-widest text-navy-foreground transition-all hover:bg-gold hover:text-gold-foreground">
              <Search className="h-4 w-4" /> Search Homes
            </button>
          </form>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { icon: Compass, title: "Strategy Session", body: "We start with a private consult to map your must-haves, budget, and timeline." },
              { icon: MapPin, title: "Curated Tours", body: "We hand-select properties — including off-market and coming-soon — that fit." },
              { icon: Search, title: "Win the Offer", body: "Sharp negotiation and clean diligence to win without overpaying." },
            ].map((s) => (
              <div key={s.title} className="rounded-sm border border-border bg-card p-7">
                <s.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-5 font-serif text-xl text-navy">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedListings />
      <Valuation />
    </SiteLayout>
  );
}
