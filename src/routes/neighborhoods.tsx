import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Neighborhoods } from "@/components/site/Neighborhoods";
import heroNeighborhoods from "@/assets/hero-neighborhoods.jpg";

export const Route = createFileRoute("/neighborhoods")({
  head: () => ({
    meta: [
      { title: "Union County NJ Neighborhoods | Michelle David Realty Group" },
      { name: "description", content: "Westfield, Summit, Cranford, Kenilworth and beyond — explore Union County, NJ neighborhood guides, schools, and market trends." },
      { property: "og:title", content: "Union County NJ Neighborhood Guides" },
      { property: "og:description", content: "Hyper-local intelligence on every town we serve across Union County, NJ." },
      { property: "og:image", content: heroNeighborhoods },
    ],
    links: [{ rel: "canonical", href: "/neighborhoods" }],
  }),
  component: NeighborhoodsPage,
});

function NeighborhoodsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Explore"
        title={<>The towns we <span className="italic text-gold">call home</span></>}
        subtitle="Tree-lined streets, top-rated schools, NYC-bound trains, and a sense of community you can feel. Start with the towns below."
        image={heroNeighborhoods}
        imageAlt="Aerial view of Union County New Jersey neighborhood in autumn"
      />
      <Neighborhoods />
    </SiteLayout>
  );
}
