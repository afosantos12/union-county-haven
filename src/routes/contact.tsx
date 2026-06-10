import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { FadeUp } from "@/components/site/FadeUp";
import heroContact from "@/assets/hero-contact.jpg";
import { Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Michelle David Realty Group | Union County NJ" },
      { name: "description", content: "Reach the Michelle David Realty Group team for buying, selling, or a private home valuation in Union County, NJ." },
      { property: "og:title", content: "Contact Michelle David Realty Group" },
      { property: "og:description", content: "Get in touch with our Union County, NJ real estate team." },
      { property: "og:image", content: heroContact },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Get in Touch"
        title={<>Let's start the <span className="italic text-gold">conversation</span></>}
        subtitle="Whether you're three weeks or three years from a move, we're happy to talk. Every inquiry is answered personally — usually within the same day."
        image={heroContact}
        imageAlt="Charming downtown Westfield New Jersey street at dusk"
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5 lg:px-10">

          <FadeUp direction="left" className="lg:col-span-2 space-y-8">
            <div>
              <p className="eyebrow">Office</p>
              <div className="mt-4 flex items-start gap-3 text-foreground">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <div className="text-sm leading-relaxed">
                  632 Boulevard<br />Kenilworth, NJ 07033
                </div>
              </div>
            </div>
            <div>
              <p className="eyebrow">Phone</p>
              <a href="tel:+19082766299" className="mt-4 flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                <Phone className="h-5 w-5 text-gold" />
                <span className="text-sm">(908) 276-6299</span>
              </a>
            </div>
            <div>
              <p className="eyebrow">Email</p>
              <a href="mailto:michelle@michelledavidgroup.com" className="mt-4 flex items-center gap-3 text-foreground hover:text-gold transition-colors">
                <Mail className="h-5 w-5 text-gold" />
                <span className="text-sm">michelle@michelledavidgroup.com</span>
              </a>
            </div>
          </FadeUp>

          <FadeUp direction="right" delay={100} className="lg:col-span-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="rounded-sm border border-border bg-card p-8 lg:p-10 shadow-card-soft"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="eyebrow !text-[0.65rem]">Full Name</span>
                  <input className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors" />
                </label>
                <label className="block text-sm">
                  <span className="eyebrow !text-[0.65rem]">Phone</span>
                  <input type="tel" className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors" />
                </label>
              </div>
              <label className="mt-5 block text-sm">
                <span className="eyebrow !text-[0.65rem]">Email</span>
                <input type="email" className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors" />
              </label>
              <label className="mt-5 block text-sm">
                <span className="eyebrow !text-[0.65rem]">How can we help?</span>
                <textarea rows={5} className="mt-2 w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm focus:border-gold focus:outline-none transition-colors" />
              </label>
              <button className="mt-7 w-full rounded-sm bg-navy px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-navy-foreground transition-colors hover:bg-gold hover:text-gold-foreground">
                Send Message
              </button>
            </form>
          </FadeUp>

        </div>
      </section>
    </SiteLayout>
  );
}
