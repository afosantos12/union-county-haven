import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { FeaturedListings } from "@/components/site/FeaturedListings";
import { Neighborhoods } from "@/components/site/Neighborhoods";
import { BuyerSeller } from "@/components/site/BuyerSeller";
import { Testimonials } from "@/components/site/Testimonials";
import { Valuation } from "@/components/site/Valuation";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Michelle David Realty Group | Luxury Real Estate in Union County, NJ" },
      {
        name: "description",
        content:
          "Boutique luxury real estate in Union County, New Jersey. Search homes in Westfield, Summit, Cranford, Kenilworth and beyond. Expert buying & selling guidance.",
      },
      { property: "og:title", content: "Michelle David Realty Group | Union County NJ Real Estate" },
      {
        property: "og:description",
        content:
          "Find your place in New Jersey. Curated listings, expert local guidance, and boutique service across Union County.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturedListings />
        <Neighborhoods />
        <BuyerSeller />
        <Testimonials />
        <Valuation />
      </main>
      <Footer />
    </div>
  );
}
