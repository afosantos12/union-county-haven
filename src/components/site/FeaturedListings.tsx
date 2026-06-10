import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IDX Broker Showcase Widget — Featured Listings
//
// - The site's domain must be whitelisted in IDX Broker account settings
//   under "Approved Domains" for the widget to load correctly.
// - Listing photos, prices, statuses, and MLS details come automatically
//   from IDX Broker, synced from GSMLS, Jersey MLS, and Ocean/Monmouth MLS.
// - New active listings marked as "featured" in IDX Broker appear here
//   automatically — no manual website updates needed.
//
// To update the widget: replace the src URL below with the new widget src
// from IDX Broker → Leads & Listings → Widgets → Showcase.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_FEATURED_LISTINGS_EMBED_CODE = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-44006" src="//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006"></script>`;

// Safely injects IDX Broker embed codes that use <script> tags.
// dangerouslySetInnerHTML does not execute scripts, so we use useEffect to
// re-create script elements so the browser actually runs them.
function IdxEmbed({ code }: { code: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const template = document.createElement("template");
    template.innerHTML = code;

    Array.from(template.content.childNodes).forEach((node) => {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as Element).tagName === "SCRIPT"
      ) {
        const original = node as HTMLScriptElement;
        const script = document.createElement("script");
        Array.from(original.attributes).forEach((attr) =>
          script.setAttribute(attr.name, attr.value)
        );
        if (!original.src) script.textContent = original.textContent;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  return <div ref={containerRef} className="w-full" />;
}

export function FeaturedListings() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section heading — preserved from original design */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
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
        </div>

        {/* IDX Broker Showcase Widget */}
        <div className="mt-14 w-full overflow-hidden rounded-sm">
          <IdxEmbed code={IDX_FEATURED_LISTINGS_EMBED_CODE} />
        </div>

      </div>
    </section>
  );
}
