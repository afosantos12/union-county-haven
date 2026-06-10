import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IDX Broker Showcase Widget — Featured Listings
//
// - Domain must be whitelisted in IDX Broker → Account Settings → Approved Domains.
// - Listing data syncs automatically from GSMLS, Jersey MLS, Ocean/Monmouth MLS.
// - New featured listings appear automatically — no manual site edits needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_WIDGET_SRC =
  "//michelledavidrealtygroup.idxbroker.com/idx/customshowcasejs.php?widgetid=44006";

type Listing = {
  href: string;
  imgSrc: string;
  address: string;
  city: string;
  price: string;
};

function parseListings(container: HTMLElement): { listings: Listing[]; viewAllHref: string } {
  const cells = Array.from(container.querySelectorAll<HTMLElement>("td.IDX-showcaseCell"));
  const listings = cells.map((cell) => ({
    href: cell.querySelector<HTMLAnchorElement>("a")?.href || "#",
    imgSrc: cell.querySelector<HTMLImageElement>("img")?.src || "",
    address: cell.querySelector(".IDX-showcaseAddress")?.textContent?.trim() || "",
    city: cell.querySelector(".IDX-showcaseCity")?.textContent?.trim() || "",
    price: cell.querySelector(".IDX-showcasePrice")?.textContent?.trim() || "",
  }));
  const viewAllEl = container.querySelector<HTMLAnchorElement>(
    "#IDX-showcaseWidgetWrap a:not(td a)"
  );
  return { listings, viewAllHref: viewAllEl?.href || "/search" };
}

function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-border bg-card">
      <div className="aspect-[4/3] animate-pulse bg-muted" />
      <div className="p-6 space-y-3">
        <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a
      href={listing.href}
      className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
      style={{ textDecoration: "none" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {listing.imgSrc && (
          <img
            src={listing.imgSrc}
            alt={listing.address}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-serif text-2xl font-bold text-navy">{listing.price}</p>
        <h3 className="mt-2 truncate font-serif text-lg text-foreground">{listing.address}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{listing.city}</p>
        <div className="mt-4 border-t border-border pt-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            View listing →
          </span>
        </div>
      </div>
    </a>
  );
}

export function FeaturedListings() {
  const idxRef = useRef<HTMLDivElement>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [viewAllHref, setViewAllHref] = useState("/search");
  // null = loading, false = no data, true = ready
  const [state, setState] = useState<"loading" | "ready" | "empty">("loading");

  useEffect(() => {
    const container = idxRef.current;
    if (!container) return;

    // Inject the IDX script into the container.
    // Must be in a visible, in-layout element — IDX Broker checks container dimensions.
    const script = document.createElement("script");
    script.charset = "UTF-8";
    script.type = "text/javascript";
    script.id = "idxwidgetsrc-44006";
    script.src = IDX_WIDGET_SRC;
    container.appendChild(script);

    let extracted = false;

    function tryExtract() {
      if (extracted) return;
      const cells = container!.querySelectorAll("td.IDX-showcaseCell");
      if (cells.length > 0) {
        extracted = true;
        const { listings: parsed, viewAllHref: href } = parseListings(container!);
        setListings(parsed);
        setViewAllHref(href);
        setState(parsed.length > 0 ? "ready" : "empty");
      }
    }

    // Watch for IDX to inject content
    const observer = new MutationObserver(tryExtract);
    observer.observe(container, { childList: true, subtree: true });

    // Belt-and-suspenders: also try at fixed intervals
    const t1 = setTimeout(tryExtract, 1000);
    const t2 = setTimeout(tryExtract, 2500);
    // Final timeout — give up and show fallback
    const t3 = setTimeout(() => {
      if (!extracted) setState("empty");
    }, 10000);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Section heading */}
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

        <div className="mt-14">
          {/* IDX Broker renders here — kept in layout so script executes,
              but invisible to users until we extract the data */}
          <div
            ref={idxRef}
            aria-hidden="true"
            style={{
              visibility: "hidden",
              height: 0,
              overflow: "hidden",
              position: "absolute",
              width: "100%",
              maxWidth: "1280px",
            }}
          />

          {/* Skeleton while IDX loads */}
          {state === "loading" && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Our custom cards — built from IDX data */}
          {state === "ready" && (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {listings.map((listing, i) => (
                  <ListingCard key={i} listing={listing} />
                ))}
              </div>
              <div className="mt-10">
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

          {/* Fallback if domain not yet whitelisted in IDX Broker */}
          {state === "empty" && (
            <div className="flex min-h-[260px] items-center justify-center rounded-sm border-2 border-dashed border-border bg-card px-8 py-16 text-center">
              <div className="max-w-sm">
                <p className="font-serif text-xl text-navy">Listings loading…</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add the site's domain to IDX Broker → Account Settings → Approved Domains to display live listings.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
