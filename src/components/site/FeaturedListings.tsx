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
const IDX_FEATURED_LISTINGS_EMBED_CODE = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-44006" src="//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006"></script>`;

function applyIdxStyles(container: HTMLElement) {
  // Force the widget and all its wrappers to full width
  container.querySelectorAll<HTMLElement>(
    "#IDX-showcaseWidgetWrap, .IDX-showcase, .IDX-showcaseWrapper"
  ).forEach((el) => {
    el.style.width = "100%";
    el.style.maxWidth = "100%";
  });

  // Convert the hardcoded-width table to a full-width responsive grid
  container.querySelectorAll<HTMLTableElement>("table.IDX-showcaseTable, .IDX-showcaseTable").forEach((table) => {
    table.removeAttribute("width");
    table.removeAttribute("cellspacing");
    table.removeAttribute("cellpadding");
    table.style.width = "100%";
    table.style.maxWidth = "100%";
    table.style.borderCollapse = "separate";
    table.style.borderSpacing = "0";
    table.style.display = "grid";
    table.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
    table.style.gap = "1.75rem";
    table.style.border = "none";
  });

  // tbody and tr must be display:contents for CSS grid to work on table
  container.querySelectorAll<HTMLElement>("table.IDX-showcaseTable tbody, table.IDX-showcaseTable tr").forEach((el) => {
    el.style.display = "contents";
  });

  // Style each listing card
  container.querySelectorAll<HTMLTableCellElement>("td.IDX-showcaseCell").forEach((cell) => {
    cell.style.display = "flex";
    cell.style.flexDirection = "column";
    cell.style.border = "1px solid rgba(27,43,75,0.1)";
    cell.style.borderRadius = "4px";
    cell.style.overflow = "hidden";
    cell.style.background = "#fff";
    cell.style.padding = "0";
    cell.style.verticalAlign = "top";
    cell.style.boxShadow = "0 1px 4px rgba(27,43,75,0.06), 0 6px 20px rgba(27,43,75,0.06)";
    cell.style.transition = "transform 0.45s ease, box-shadow 0.45s ease";
    cell.style.cursor = "pointer";
    cell.addEventListener("mouseenter", () => {
      cell.style.transform = "translateY(-5px)";
      cell.style.boxShadow = "0 12px 40px rgba(27,43,75,0.18)";
    });
    cell.addEventListener("mouseleave", () => {
      cell.style.transform = "";
      cell.style.boxShadow = "0 1px 4px rgba(27,43,75,0.06), 0 6px 20px rgba(27,43,75,0.06)";
    });
  });

  // Style images inside cards
  container.querySelectorAll<HTMLElement>("td.IDX-showcaseCell img").forEach((img) => {
    img.style.width = "100%";
    img.style.height = "210px";
    img.style.objectFit = "cover";
    img.style.objectPosition = "center";
    img.style.display = "block";
    img.style.transition = "transform 1s ease";
    const parent = img.closest("td");
    if (parent) {
      parent.addEventListener("mouseenter", () => { img.style.transform = "scale(1.04)"; });
      parent.addEventListener("mouseleave", () => { img.style.transform = ""; });
    }
  });

  // Style address text
  container.querySelectorAll<HTMLElement>(".IDX-showcaseAddress").forEach((el) => {
    el.style.padding = "1rem 1.25rem 0.2rem";
    el.style.fontSize = "1rem";
    el.style.fontWeight = "600";
    el.style.color = "#1B2B4B";
    el.style.lineHeight = "1.35";
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";
    el.style.textAlign = "left";
  });

  // Style city text
  container.querySelectorAll<HTMLElement>(".IDX-showcaseCity").forEach((el) => {
    el.style.padding = "0 1.25rem 0.25rem";
    el.style.fontSize = "0.8125rem";
    el.style.color = "rgba(0,0,0,0.45)";
    el.style.textAlign = "left";
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";
  });

  // Style price text
  container.querySelectorAll<HTMLElement>(".IDX-showcasePrice").forEach((el) => {
    el.style.padding = "0.35rem 1.25rem 1.2rem";
    el.style.fontSize = "1.2rem";
    el.style.fontWeight = "700";
    el.style.color = "#1B2B4B";
    el.style.letterSpacing = "-0.01em";
    el.style.textAlign = "left";
  });

  // Style "View All Results" link
  container.querySelectorAll<HTMLElement>(".IDX-viewAllLink, .IDX-showcaseViewAll a, #IDX-showcaseWidgetWrap > div > a").forEach((el) => {
    el.style.display = "inline-flex";
    el.style.alignItems = "center";
    el.style.gap = "0.5rem";
    el.style.marginTop = "1.75rem";
    el.style.fontSize = "0.7rem";
    el.style.fontWeight = "700";
    el.style.textTransform = "uppercase";
    el.style.letterSpacing = "0.18em";
    el.style.color = "#1B2B4B";
    el.style.textDecoration = "none";
    el.style.borderBottom = "1px solid #C9A84C";
    el.style.paddingBottom = "2px";
    el.addEventListener("mouseenter", () => { el.style.color = "#C9A84C"; });
    el.addEventListener("mouseleave", () => { el.style.color = "#1B2B4B"; });
  });
}

function IdxFeaturedWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    // Inject the IDX script (re-created as a real DOM script so browser runs it)
    const template = document.createElement("template");
    template.innerHTML = IDX_FEATURED_LISTINGS_EMBED_CODE;

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

    // Watch for IDX content being injected by the async script, then apply styles
    const observer = new MutationObserver(() => {
      const hasContent = container.querySelector(".IDX-showcaseCell, .IDX-showcaseTable");
      if (hasContent) {
        applyIdxStyles(container);
      }
    });

    observer.observe(container, { childList: true, subtree: true, attributes: true });

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, []);

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
          <IdxFeaturedWidget />
        </div>

      </div>
    </section>
  );
}
