import { Star, ExternalLink } from "lucide-react";
import { googleReviews, googleReviewsUrl } from "@/data/google-reviews";

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Client Stories</p>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
            Trusted by families across <span className="italic">Union County</span>
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">
            Every word below comes straight from our Google Business Profile —
            never edited, never invented.
          </p>
        </div>

        {googleReviews.length === 0 ? (
          <div className="mt-14 mx-auto max-w-2xl rounded-sm border border-dashed border-border bg-card p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15">
              <Star className="h-5 w-5 fill-current text-gold" />
            </div>
            <h3 className="mt-5 font-serif text-2xl text-navy">
              Real reviews, coming straight from Google
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We're pulling the latest verified reviews directly from the
              Michelle David Realty Group Google profile. Want to read them all,
              or leave one of your own?
            </p>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-navy px-5 py-3 text-xs font-semibold uppercase tracking-widest text-navy-foreground transition-colors hover:bg-gold hover:text-gold-foreground"
            >
              View on Google
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {googleReviews.map((r) => (
              <figure
                key={`${r.name}-${r.date}`}
                className="relative flex h-full flex-col rounded-sm bg-card p-8 shadow-card-soft"
              >
                <div className="flex gap-1 text-gold" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-1 font-serif text-lg leading-relaxed text-foreground">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-5">
                  <div className="font-semibold text-navy">{r.name}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Google review · {r.date}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
