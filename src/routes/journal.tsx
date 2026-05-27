import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import heroJournal from "@/assets/hero-journal.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal | Michelle David Realty Group" },
      { name: "description", content: "Market insights, neighborhood guides, and design notes from the Michelle David Realty Group team in Union County, NJ." },
      { property: "og:title", content: "The Michelle David Journal" },
      { property: "og:description", content: "Market notes, neighborhood guides, and design inspiration from Union County, NJ." },
      { property: "og:image", content: heroJournal },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

const posts = [
  { tag: "Market Notes", title: "What Q2 2026 Looks Like in Westfield & Summit", excerpt: "Inventory is creeping up while rates ease — here's what it means for buyers and sellers this season." },
  { tag: "Neighborhood Guide", title: "Cranford for First-Time Buyers", excerpt: "Why this walkable downtown keeps topping our list for young families relocating from NYC." },
  { tag: "Design", title: "Five Pre-Listing Upgrades That Always Pay Back", excerpt: "From lighting to landscape — the small moves that move the needle on offer day." },
];

function JournalPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Journal"
        title={<>Notes from the <span className="italic text-gold">field</span></>}
        subtitle="Market intelligence, neighborhood deep-dives, and design inspiration — written by the team, for the people who love this corner of New Jersey."
        image={heroJournal}
        imageAlt="Editorial magazine spread with coffee and brass key on a marble table"
      />

      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.title} className="group flex h-full flex-col rounded-sm border border-border bg-card p-7 transition-shadow hover:shadow-card-soft">
                <span className="eyebrow">{p.tag}</span>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-navy group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <span className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold">
                  Read article →
                </span>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-sm text-muted-foreground">
            More stories coming soon.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
