import { ArrowRight } from "lucide-react";

export function Valuation() {
  return (
    <section id="valuation" className="relative isolate overflow-hidden gradient-navy py-24 text-white lg:py-32">
      <div className="absolute inset-0 -z-10 opacity-20"
           style={{
             backgroundImage:
               "radial-gradient(circle at 20% 30%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 70%, var(--gold) 0%, transparent 40%)",
           }}
      />
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="eyebrow">Complimentary Home Valuation</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-balance">
            Curious what your home is worth in today's market?
          </h2>
          <p className="mt-5 max-w-md text-white/75">
            Receive a detailed, no-obligation valuation prepared by Michelle and informed
            by live Union County market data.
          </p>
          <div className="mt-8 hairline max-w-xs" />
          <p className="mt-6 text-sm text-white/60">
            Typical response within 24 hours.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-sm bg-white/5 p-8 backdrop-blur-md ring-1 ring-white/10"
        >
          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Property address"
              className="w-full rounded-sm border-0 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-sm border-0 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-gold"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full rounded-sm border-0 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-sm border-0 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-gold"
            />
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-colors hover:bg-white hover:text-navy"
            >
              Request Valuation
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="text-center text-xs text-white/50">
              We respect your privacy. Your information stays with our team.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
