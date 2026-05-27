import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Michelle and her team made selling our family home feel effortless. Their marketing was beautiful and we had multiple offers above ask within a week.",
    name: "The Caruso Family",
    place: "Westfield, NJ",
  },
  {
    quote:
      "As first-time buyers, we felt informed at every step. Honest, patient, and unbelievably knowledgeable about every town we toured.",
    name: "Daniel & Priya R.",
    place: "Cranford, NJ",
  },
  {
    quote:
      "A boutique experience with major-market expertise. We've now bought and sold three homes with Michelle David Realty.",
    name: "Jennifer K.",
    place: "Summit, NJ",
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Client Stories</p>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
            Trusted by families across <span className="italic">Union County</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="relative flex h-full flex-col rounded-sm bg-card p-8 shadow-card-soft"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 flex-1 font-serif text-lg leading-relaxed text-foreground">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-semibold text-navy">{r.name}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {r.place}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
