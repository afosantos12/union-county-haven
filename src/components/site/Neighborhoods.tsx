import westfield from "@/assets/hood-westfield.jpg";
import cranford from "@/assets/hood-cranford.jpg";
import summit from "@/assets/hood-summit.jpg";
import kenilworth from "@/assets/hood-kenilworth.jpg";
import { FadeUp } from "@/components/site/FadeUp";

const hoods = [
  { name: "Westfield", img: westfield, search: "/search?q=Westfield+NJ", note: "Downtown charm, top-rated schools, and a thriving community just 35 minutes from NYC." },
  { name: "Summit", img: summit, search: "/search?q=Summit+NJ", note: "One of NJ's most sought-after addresses — walkable, affluent, and consistently strong market." },
  { name: "Cranford", img: cranford, search: "/search?q=Cranford+NJ", note: "A riverside gem with strong neighborhood character and excellent value across all price points." },
  { name: "Kenilworth", img: kenilworth, search: "/search?q=Kenilworth+NJ", note: "A tight-knit community with easy highway access and outstanding opportunity for buyers." },
];

const statewide = [
  "Essex County", "Morris County", "Bergen County", "Somerset County",
  "Middlesex County", "Monmouth County", "Ocean County", "Hudson County",
  "Passaic County", "Union County",
];

export function Neighborhoods() {
  return (
    <>
      {/* Core markets */}
      <section className="relative bg-secondary/40 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <FadeUp className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Where Our Expertise Runs Deepest</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
              Our core <span className="italic">Union County markets</span>
            </h2>
            <p className="mt-5 text-muted-foreground">
              These are the towns we know best — the streets, the schools, the micro-markets,
              and the neighbors. We've helped hundreds of clients buy and sell here, and that
              depth shows at every step of the transaction.
            </p>
          </FadeUp>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {hoods.map((h, i) => (
              <FadeUp key={h.name} delay={i * 100}>
                <a
                  href={h.search}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm shadow-card-soft"
                >
                  <img
                    src={h.img}
                    alt={`${h.name}, NJ`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent opacity-90" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <div className="h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                    <h3 className="mt-3 font-serif text-2xl">{h.name}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {h.note}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-widest text-white/60">
                      View Listings →
                    </p>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Statewide reach */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeUp>
              <p className="eyebrow">Statewide Service</p>
              <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
                Union County is home.<br />
                <span className="italic">New Jersey is our market.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-foreground/75">
                While Westfield, Summit, Cranford, and Kenilworth are where our roots run
                deepest, Michelle David Realty Group actively represents buyers, sellers,
                investors, and renters across the entire state of New Jersey. No matter
                where your real estate goals take you, you'll have the same boutique-level
                service and local intelligence behind you.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/search" className="inline-flex items-center justify-center rounded-sm bg-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:bg-gold">
                  Search All NJ Listings
                </a>
                <a href="/contact" className="inline-flex items-center justify-center rounded-sm border border-navy px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-navy transition-all hover:border-gold hover:text-gold">
                  Talk to Our Team
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-foreground/50">
                Counties we serve
              </p>
              <div className="flex flex-wrap gap-3">
                {statewide.map((county, i) => (
                  <span
                    key={county}
                    className={`rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                      county === "Union County"
                        ? "border-gold bg-gold/10 text-navy"
                        : "border-border bg-card text-foreground/70"
                    }`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    {county}
                  </span>
                ))}
              </div>
              <p className="mt-5 text-xs text-muted-foreground">
                And beyond — if you're buying or selling anywhere in New Jersey, reach out.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
