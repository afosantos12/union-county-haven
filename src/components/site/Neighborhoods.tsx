import westfield from "@/assets/hood-westfield.jpg";
import cranford from "@/assets/hood-cranford.jpg";
import summit from "@/assets/hood-summit.jpg";
import kenilworth from "@/assets/hood-kenilworth.jpg";

const hoods = [
  { name: "Westfield", img: westfield, search: "/search?q=Westfield+NJ" },
  { name: "Summit", img: summit, search: "/search?q=Summit+NJ" },
  { name: "Cranford", img: cranford, search: "/search?q=Cranford+NJ" },
  { name: "Kenilworth", img: kenilworth, search: "/search?q=Kenilworth+NJ" },
];

export function Neighborhoods() {
  return (
    <section className="relative bg-secondary/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Communities We Love</p>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
            Union County, <span className="italic">intimately known</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            From historic downtowns to leafy cul-de-sacs, we live and work in every town we
            serve. Explore the neighborhoods our clients call home.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hoods.map((h) => (
            <a
              key={h.name}
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
                <p className="mt-1 text-xs uppercase tracking-widest text-white/70">
                  View Listings →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
