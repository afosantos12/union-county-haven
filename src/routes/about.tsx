import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";
import heroAbout from "@/assets/hero-about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Michelle David Realty Group | Union County NJ" },
      { name: "description", content: "A boutique Union County, NJ real estate firm built on local expertise, editorial-grade marketing, and a calm, white-glove client experience." },
      { property: "og:title", content: "About Michelle David Realty Group" },
      { property: "og:description", content: "Boutique real estate done right — in the towns we've called home for years." },
      { property: "og:image", content: heroAbout },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Story"
        title={<>A boutique built on <span className="italic text-gold">trust</span></>}
        subtitle="We're a small, senior team that prefers depth over volume — every client is handled by a principal advisor, every listing gets the full treatment."
        image={heroAbout}
        imageAlt="Sophisticated interior of a luxury real estate office with navy walls and leather chairs"
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">
              Local for life, professional to the core.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-foreground/80">
            <p>
              Michelle David Realty Group was founded on a simple idea: Union County
              families and investors deserve the same caliber of representation
              you'd expect in Manhattan or the Hamptons — but delivered with the
              warmth of a neighbor.
            </p>
            <p>
              We are advisors first, salespeople second. That means pricing your
              home with real data instead of optimism, telling you when a property
              isn't right, and treating every transaction as if our family lived
              under that roof.
            </p>
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
    </SiteLayout>
  );
}
