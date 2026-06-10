import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IDX Broker Showcase Widget — Featured Listings
//
// - The site's domain must be whitelisted in IDX Broker → Account Settings →
//   Approved Domains for the widget to load correctly.
// - Listing data (photos, prices, addresses, MLS status) is pulled live from
//   IDX Broker, which syncs automatically from GSMLS, Jersey MLS, and
//   Ocean/Monmouth MLS.
// - New featured listings update automatically — no manual site edits needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_WIDGET_SRC =
  "//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006";
const IDX_WIDGET_ID = "idxwidgetsrc-44006";

type Listing = {
  href: string;
  imgSrc: string;
  address: string;
  city: string;
  price: string;
};

// Parses IDX Broker's injected table HTML and extracts listing data
function parseIdxListings(container: HTMLElement): { listings: Listing[]; viewAllHref: string } {
  const cells = Array.from(container.querySelectorAll<HTMLElement>("td.IDX-showcaseCell"));
  const listings: Listing[] = cells.map((cell) => {
    const link = cell.querySelector<HTMLAnchorElement>("a");
    const img = cell.querySelector<HTMLImageElement>("img");
    return {
      href: link?.href || "#",
      imgSrc: img?.src || "",
      address: cell.querySelector(".IDX-showcaseAddress")?.textContent?.trim() || "",
      city: cell.querySelector(".IDX-showcaseCity")?.textContent?.trim() || "",
      price: cell.querySelector(".IDX-showcasePrice")?.textContent?.trim() || "",
    };
  });

  // Find the "View All Results" link IDX Broker appends below the table
  const viewAllEl = container.querySelector<HTMLAnchorElement>(
    "#IDX-showcaseWidgetWrap a:not(td a), .IDX-viewAllLink"
  );
  return { listings, viewAllHref: viewAllEl?.href || "/search" };
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a
      href={listing.href}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury no-underline"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {listing.imgSrc ? (
          <img
            src={listing.imgSrc}
            alt={listing.address}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="font-serif text-2xl font-bold text-navy">{listing.price}</div>
        <h3 className="mt-2 truncate font-serif text-lg text-foreground">{listing.address}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{listing.city}</p>
        <div className="mt-4 flex items-center pt-4 border-t border-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold transition-all group-hover:tracking-[0.2em]">
            View listing →
          </span>
        </div>
      </div>
    </a>
  );
}

function IdxFeaturedWidget() {
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [viewAllHref, setViewAllHref] = useState("/search");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hidden = hiddenRef.current;
    if (!hidden) return;

    // Inject the IDX script into a hidden off-screen div so it renders
    // without being visible, then we extract and re-render with our styles
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = IDX_WIDGET_ID;
    script.src = IDX_WIDGET_SRC;
    hidden.appendChild(script);

    // MutationObserver fires when IDX injects its table into the hidden div
    const observer = new MutationObserver(() => {
      const cells = hidden.querySelectorAll("td.IDX-showcaseCell");
      if (cells.length > 0) {
        observer.disconnect();
        const { listings: parsed, viewAllHref: href } = parseIdxListings(hidden);
        if (parsed.length > 0) {
          setListings(parsed);
          setViewAllHref(href);
          setLoading(false);
        }
      }
    });

    observer.observe(hidden, { childList: true, subtree: true });

    // Timeout fallback — if IDX doesn't load (e.g. domain not whitelisted), stop spinner
    const timeout = setTimeout(() => {
      observer.disconnect();
      setLoading(false);
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      hidden.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Hidden IDX render target — off screen, never visible */}
      <div
        ref={hiddenRef}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: 0, width: "600px", overflow: "hidden", pointerEvents: "none" }}
      />

      {loading && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-sm border border-border bg-card">
              <div className="aspect-[4/3] animate-pulse bg-muted" />
              <div className="p-6 space-y-3">
                <div className="h-7 w-1/3 animate-pulse rounded bg-muted" />
                <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && listings.length > 0 && (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, i) => (
              <ListingCard key={i} listing={listing} />
            ))}
          </div>
          <div className="mt-8">
            <a
              href={viewAllHref}
              className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-navy hover:text-gold transition-colors"
            >
              View all results
              <span className="h-px w-10 bg-navy transition-all group-hover:w-16 group-hover:bg-gold" />
            </a>
          </div>
        </>
      )}

      {!loading && listings.length === 0 && (
        <div className="flex min-h-[260px] items-center justify-center rounded-sm border-2 border-dashed border-border bg-card text-center px-8 py-16">
          <div className="max-w-sm">
            <p className="font-serif text-xl text-navy">Listings loading…</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Connect the site's domain in IDX Broker → Account Settings → Approved Domains to display live listings.
            </p>
          </div>
        </div>
      )}
    </>
  );
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
