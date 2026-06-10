import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Testimonials } from "@/components/site/Testimonials";
import { FadeUp } from "@/components/site/FadeUp";
import heroAbout from "@/assets/hero-about.jpg";
import { Shield, Users, MapPin, Award } from "lucide-react";

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

const values = [
  {
    icon: Shield,
    title: "Honesty First",
    body: "We tell you what you need to hear, not what you want to hear. Honest pricing, honest timelines, and honest advice — even when it's not what sells.",
  },
  {
    icon: Users,
    title: "People Over Transactions",
    body: "Every client is handled by a senior advisor, not passed down the chain. We keep our roster intentionally small so every relationship gets the attention it deserves.",
  },
  {
    icon: MapPin,
    title: "Hyper-Local Knowledge",
    body: "We've lived and worked in these communities for decades. We know the streets, the schools, the micro-markets, and the neighbors — and that depth shows.",
  },
  {
    icon: Award,
    title: "Full-Service Excellence",
    body: "From pricing strategy to professional photography, marketing, negotiation, and closing — every listing gets the full treatment, every time.",
  },
];

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

      {/* Who we are */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <FadeUp>
            <p className="eyebrow">Who We Are</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl leading-tight">
              Local for life,<br />professional to the core.
            </h2>
            <div className="hairline my-7 w-16" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/team"
                className="inline-flex items-center justify-center rounded-sm bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-gold"
              >
                Meet the Team
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest text-navy transition-all hover:border-gold hover:text-gold"
              >
                Get in Touch
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={150} className="space-y-5 text-base leading-relaxed text-foreground/80">
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
            <p>
              With more than 22 years of experience serving buyers, sellers, investors,
              landlords, and commercial clients across New Jersey, Michelle David has
              built a reputation for integrity, market expertise, and results that speak
              for themselves — not inflated statistics.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/40 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What We Stand For</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
              The values behind <span className="italic">every transaction</span>
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 100}>
                <div className="rounded-sm border border-border bg-card p-8 h-full">
                  <v.icon className="h-6 w-6 text-gold" />
                  <h3 className="mt-5 font-serif text-xl text-navy">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Testimonials />

      {/* CTA */}
      <section className="gradient-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <FadeUp>
            <p className="eyebrow" style={{ color: "var(--gold)" }}>Work With Us</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Ready to take the <span className="italic text-gold">next step?</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
              Whether you're buying, selling, investing, or just exploring your options —
              we're here to give you straight answers and real guidance.
            </p>
          </FadeUp>
          <FadeUp delay={150} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-sm bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:bg-transparent hover:text-gold hover:ring-1 hover:ring-gold"
            >
              Contact Us
            </Link>
            <Link
              to="/search"
              className="rounded-sm border border-white/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-gold hover:text-gold"
            >
              Browse Listings
            </Link>
          </FadeUp>
        </div>
      </section>
    </SiteLayout>
  );
}
