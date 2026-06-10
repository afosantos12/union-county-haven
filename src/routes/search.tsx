import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { IdxSearch } from "@/components/site/IdxSearch";
import { FadeUp } from "@/components/site/FadeUp";
import heroListings from "@/assets/hero-journal.jpg";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search MLS Listings | Michelle David Realty Group" },
      { name: "description", content: "Search every active listing across GSMLS, Jersey MLS, and Ocean/Monmouth MLS with Michelle David Realty Group." },
      { property: "og:title", content: "Search MLS Listings | Michelle David Realty Group" },
      { property: "og:description", content: "Browse homes for sale across all New Jersey MLS feeds." },
      { property: "og:image", content: heroListings },
    ],
    links: [{ rel: "canonical", href: "/search" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="MLS Search"
        title={<>Browse every home <span className="italic text-gold">for sale in NJ</span></>}
        subtitle="Live listings pulled directly from GSMLS, Jersey MLS, and Ocean/Monmouth MLS — every active property, updated in real time."
        image={heroListings}
        imageAlt="Brass house key on marble — New Jersey real estate listings"
      />

      <section className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mb-10 flex flex-col gap-2">
            <p className="eyebrow">All MLS Feeds</p>
            <h2 className="font-serif text-3xl text-navy md:text-4xl">
              Search <span className="italic">every listing</span>
            </h2>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Not just our own — every property on the market across Union County and beyond, including listings from other agents and brokerages.
            </p>
          </FadeUp>

          <FadeUp delay={150}>
            <IdxSearch />
          </FadeUp>
        </div>
      </section>
    </SiteLayout>
  );
}
