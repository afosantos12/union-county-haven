type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  image: string;
  imageAlt: string;
};

export function PageHero({ eyebrow, title, subtitle, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[72svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={image}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="h-full w-full object-cover ken-burns"
        />
        <div className="absolute inset-0 gradient-hero-overlay" />
      </div>
      <div className="mx-auto w-full max-w-5xl px-6 pt-32 pb-20 text-center text-white lg:px-10">
        <p className="eyebrow reveal" style={{ color: "var(--gold)" }}>
          {eyebrow}
        </p>
        <h1 className="reveal reveal-delay-1 mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="reveal reveal-delay-2 mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
