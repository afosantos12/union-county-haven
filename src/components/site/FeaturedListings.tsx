import { useEffect, useRef } from "react";
import { FadeUp } from "@/components/site/FadeUp";

// IDX Broker Showcase Widget
// - Whitelist the site domain in IDX Broker → Account Settings → Approved Domains
// - Listings sync automatically from GSMLS, Jersey MLS, and Ocean/Monmouth MLS
const IDX_EMBED = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-44006" src="//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006"></script>`;

function IdxWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = "idxwidgetsrc-44006";
    script.src = "//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006";
    container.appendChild(script);

    return () => { container.innerHTML = ""; };
  }, []);

  return <div ref={ref} className="w-full" />;
}

export function FeaturedListings() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <FadeUp className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="eyebrow">Featured Listings</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl text-balance">
              A curated selection of
              <span className="italic"> remarkable homes</span>
            </h2>
          </div>
          <a
            href="/search"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-navy"
          >
            View all properties
            <span className="h-px w-10 bg-navy transition-all group-hover:w-16 group-hover:bg-gold" />
          </a>
        </FadeUp>

        <div className="mt-14 w-full">
          <IdxWidget />
        </div>

      </div>
    </section>
  );
}
