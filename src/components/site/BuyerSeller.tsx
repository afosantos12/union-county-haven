import { ArrowUpRight } from "lucide-react";

export function BuyerSeller() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-sm bg-border px-6 lg:grid-cols-2 lg:px-10">
        {/* Buyers */}
        <a
          href="#"
          className="group relative flex flex-col justify-between gap-12 bg-card p-10 transition-colors hover:bg-secondary/60 lg:p-16"
        >
          <div>
            <p className="eyebrow">For Buyers</p>
            <h3 className="mt-4 font-serif text-3xl text-navy md:text-4xl">
              Discover homes that match the life you're building.
            </h3>
            <p className="mt-5 max-w-md text-muted-foreground">
              Personalized search, off-market access, and a steady hand through every
              negotiation, inspection, and closing.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-navy">
            Start your search
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </a>

        {/* Sellers */}
        <a
          href="#valuation"
          className="group relative flex flex-col justify-between gap-12 gradient-navy p-10 text-white lg:p-16"
        >
          <div>
            <p className="eyebrow">For Sellers</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl">
              A marketing strategy as distinctive as your home.
            </h3>
            <p className="mt-5 max-w-md text-white/75">
              Editorial photography, targeted exposure, and a pricing strategy informed by
              the most current Union County market data.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gold">
            Get your home's value
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </a>
      </div>
    </section>
  );
}
