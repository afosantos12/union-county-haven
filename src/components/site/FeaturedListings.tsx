import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IDX Broker Showcase Widget — Featured Listings
//
// - The site's domain must be whitelisted in IDX Broker → Account Settings →
//   Approved Domains for the widget to load correctly.
// - Listing photos, prices, statuses, and MLS details come automatically from
//   IDX Broker, synced from GSMLS, Jersey MLS, and Ocean/Monmouth MLS.
// - New active listings marked as "featured" in IDX Broker appear here
//   automatically — no manual website updates needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_FEATURED_LISTINGS_EMBED_CODE = `
<style>
  /* ── IDX Broker Showcase — Site-matched styling ── */

  #IDX-showcaseWidgetWrap,
  #IDX-showcaseWidgetWrap * {
    font-family: inherit;
    box-sizing: border-box;
  }

  /* Convert table to responsive grid */
  .IDX-showcaseTable {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 1.75rem !important;
    width: 100% !important;
    border: none !important;
    border-collapse: unset !important;
    border-spacing: 0 !important;
  }

  .IDX-showcaseTable tbody { display: contents !important; }
  .IDX-showcaseTable tr    { display: contents !important; }

  /* Cards */
  .IDX-showcaseCell {
    display: flex !important;
    flex-direction: column !important;
    border: 1px solid rgba(27, 43, 75, 0.09) !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    background: #fff !important;
    padding: 0 !important;
    vertical-align: top !important;
    box-shadow: 0 1px 4px rgba(27,43,75,0.06), 0 6px 20px rgba(27,43,75,0.06) !important;
    transition: transform 0.45s ease, box-shadow 0.45s ease !important;
    cursor: pointer !important;
  }

  .IDX-showcaseCell:hover {
    transform: translateY(-5px) !important;
    box-shadow: 0 12px 40px rgba(27,43,75,0.16) !important;
  }

  /* Photo */
  .IDX-showcaseCell a { display: block !important; overflow: hidden !important; }

  .IDX-showcaseCell a:first-child img,
  .IDX-showcasePhoto img,
  .IDX-showcaseCell > a > img,
  .IDX-showcaseCell img {
    width: 100% !important;
    height: 220px !important;
    object-fit: cover !important;
    object-position: center !important;
    display: block !important;
    transition: transform 1s ease !important;
  }

  .IDX-showcaseCell:hover img {
    transform: scale(1.04) !important;
  }

  /* Gold status bar on hover */
  .IDX-showcaseCell::after {
    content: '' !important;
    display: block !important;
    height: 3px !important;
    background: linear-gradient(90deg, transparent, #C9A84C, transparent) !important;
    opacity: 0 !important;
    transition: opacity 0.4s ease !important;
    margin-top: auto !important;
  }

  .IDX-showcaseCell:hover::after {
    opacity: 1 !important;
  }

  /* Text area padding */
  .IDX-showcaseAddress,
  .IDX-showcaseCity,
  .IDX-showcasePrice {
    text-align: left !important;
  }

  .IDX-showcaseAddress {
    padding: 1.1rem 1.25rem 0.2rem !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #1B2B4B !important;
    line-height: 1.35 !important;
  }

  .IDX-showcaseCity {
    padding: 0 1.25rem 0.3rem !important;
    font-size: 0.8125rem !important;
    color: rgba(0,0,0,0.45) !important;
    letter-spacing: 0.01em !important;
  }

  .IDX-showcasePrice {
    padding: 0.4rem 1.25rem 1.2rem !important;
    font-size: 1.25rem !important;
    font-weight: 700 !important;
    color: #1B2B4B !important;
    letter-spacing: -0.01em !important;
  }

  /* "View All Results" link */
  #IDX-showcaseWidgetWrap a[href*="idx"],
  .IDX-viewAllLink,
  .IDX-showcaseViewAll,
  .IDX-showcaseViewAll a {
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.5rem !important;
    margin-top: 2rem !important;
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.18em !important;
    color: #1B2B4B !important;
    text-decoration: none !important;
    border-bottom: 1px solid #C9A84C !important;
    padding-bottom: 2px !important;
    transition: color 0.2s ease, border-color 0.2s ease !important;
  }

  #IDX-showcaseWidgetWrap a[href*="idx"]:hover,
  .IDX-viewAllLink:hover {
    color: #C9A84C !important;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .IDX-showcaseTable {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 640px) {
    .IDX-showcaseTable {
      grid-template-columns: 1fr !important;
    }
  }
</style>
<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-44006" src="//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006"></script>
`;

// Safely injects IDX Broker embed codes that contain <script> and <style> tags.
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
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "SCRIPT") {
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

    return () => { container.innerHTML = ""; };
  }, [code]);

  return <div ref={containerRef} className="w-full min-h-[300px]" />;
}

export function FeaturedListings() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

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

        <div className="mt-14 w-full">
          <IdxEmbed code={IDX_FEATURED_LISTINGS_EMBED_CODE} />
        </div>

      </div>
    </section>
  );
}
