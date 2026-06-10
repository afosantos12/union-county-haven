import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Valuation } from "@/components/site/Valuation";
import { FadeUp } from "@/components/site/FadeUp";
import heroSell from "@/assets/hero-sell.jpg";
import { TrendingUp, Camera, Megaphone, HandshakeIcon } from "lucide-react";

export const Route = createFileRoute("/sell")({
  head: () => ({
    meta: [
      { title: "Sell Your Home in Union County, NJ | Michelle David Realty Group" },
      { name: "description", content: "List your Union County home with a boutique team known for editorial marketing, sharp pricing strategy, and multiple-offer outcomes." },
      { property: "og:title", content: "Sell Your Home in Union County, NJ" },
      { property: "og:description", content: "Editorial marketing, surgical pricing, and a sales experience worthy of your home." },
      { property: "og:image", content: heroSell },
    ],
    links: [{ rel: "canonical", href: "/sell" }],
  }),
  component: SellPage,
});

function SellPage() {
  const steps = [
    { icon: TrendingUp, title: "Pricing Intelligence", body: "Live comps, micro-market data, and 30-day absorption modeling to land the right list price." },
    { icon: Camera, title: "Editorial Marketing", body: "Architectural photography, twilight imagery, drone, and a custom property site for every listing." },
    { icon: Megaphone, title: "Wide-Reach Exposure", body: "Syndication across Zillow, Realtor.com, Redfin, plus targeted social and our private buyer network." },
    { icon: HandshakeIcon, title: "Offer Strategy", body: "We orchestrate offer deadlines, escalation, and terms — not just price — to maximize your net." },
  ];
  return (
    <SiteLayout>
      <PageHero
        eyebrow="For Sellers"
        title={<>Sell for more, <span className="italic text-gold">with grace</span></>}
        subtitle="A concierge listing experience built around your home, your timeline, and your number — backed by editorial-grade marketing."
        image={heroSell}
        imageAlt="Elegant New Jersey home at golden hour with For Sale sign"
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <FadeUp className="text-center">
            <p className="eyebrow">The Process</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
              Four steps from listed to sold
            </h2>
          </FadeUp>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <FadeUp key={s.title} delay={i * 180}>
                <div className="rounded-sm border border-border bg-card p-7 h-full">
                  <div className="text-xs font-semibold tracking-[0.3em] text-gold">0{i + 1}</div>
                  <s.icon className="mt-4 h-6 w-6 text-navy" />
                  <h3 className="mt-4 font-serif text-xl text-navy">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Valuation />

      {/* Contact CTA */}
      <section className="gradient-navy text-white">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <FadeUp>
            <p className="eyebrow" style={{ color: "var(--gold)" }}>Ready to List?</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Let's talk about <span className="italic text-gold">your home</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80">
              Schedule a no-obligation seller consultation. We'll walk you through current
              market conditions, a pricing strategy, and what we'll do to make your listing stand out.
            </p>
          </FadeUp>
          <FadeUp delay={150} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-sm bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:bg-transparent hover:text-gold hover:ring-1 hover:ring-gold"
            >
              Book a Consultation
            </Link>
            <a
              href="tel:+19082766299"
              className="rounded-sm border border-white/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-gold hover:text-gold"
            >
              Call (908) 276-6299
            </a>
          </FadeUp>
        </div>
      </section>
    </SiteLayout>
  );
}
