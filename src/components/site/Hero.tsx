import { Search, MapPin } from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroHome}
          alt="Luxury New Jersey home at twilight"
          width={1920}
          height={1280}
          className="h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 gradient-hero-overlay" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20 text-center text-white lg:px-10">
        <p className="eyebrow reveal" style={{ color: "var(--gold)" }}>
          Union County · New Jersey
        </p>

        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          Find Your Place
          <span className="block italic text-gold">in New Jersey</span>
        </h1>

        <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-xl text-base text-white/85 sm:text-lg">
          Boutique real estate guidance for the discerning buyer and seller — from Westfield
          to Summit, Cranford to Kenilworth.
        </p>

        {/* Search */}
        <form
          className="reveal reveal-delay-3 mx-auto mt-12 flex w-full max-w-3xl flex-col items-stretch gap-2 rounded-sm bg-white/95 p-2 shadow-luxury backdrop-blur md:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-1 items-center gap-3 px-4 py-3">
            <MapPin className="h-5 w-5 shrink-0 text-navy/60" />
            <input
              type="text"
              placeholder="City, neighborhood, ZIP, or MLS #"
              className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-sm bg-navy px-7 py-3 text-xs font-semibold uppercase tracking-widest text-navy-foreground transition-all hover:bg-gold hover:text-gold-foreground"
          >
            <Search className="h-4 w-4" />
            Search Homes
          </button>
        </form>

        <div className="reveal reveal-delay-4 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-widest text-white/70">
          <span>GSMLS</span>
          <span className="h-1 w-1 rounded-full bg-gold/70" />
          <span>Jersey MLS</span>
          <span className="h-1 w-1 rounded-full bg-gold/70" />
          <span>Monmouth / Ocean MLS</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60">
        <div className="mx-auto h-12 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>
    </section>
  );
}
