import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS
//
// 1. Log into IDX Broker → Leads & Listings → Widgets → Property Search
// 2. Copy the embed/widget code and paste it into IDX_SEARCH_EMBED_CODE below.
// 3. In IDX Broker → Account Settings → Approved Domains, whitelist the site's
//    domain — the widget will silently fail without this step.
//
// Once connected:
// - Listing photos, prices, statuses, and MLS details come directly from
//   IDX Broker, synced automatically from GSMLS, Jersey MLS, and
//   Ocean/Monmouth MLS.
// - New active listings appear here automatically — no manual updates needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_SEARCH_EMBED_CODE = `
<style>
  /* ── IDX Broker Search Widget — Site-matched styling ── */

  #IDX-main,
  #IDX-wrapper,
  .IDX-wrapper,
  #IDX-searchForm,
  #IDX-resultsContainer,
  #IDX-main * {
    font-family: inherit !important;
    box-sizing: border-box !important;
  }

  /* Search form inputs */
  #IDX-searchForm input[type="text"],
  #IDX-searchForm input[type="number"],
  #IDX-searchForm select {
    border: 1px solid rgba(27,43,75,0.2) !important;
    border-radius: 3px !important;
    padding: 0.6rem 0.875rem !important;
    font-size: 0.875rem !important;
    color: #1B2B4B !important;
    background: #fff !important;
    transition: border-color 0.2s !important;
  }

  #IDX-searchForm input:focus,
  #IDX-searchForm select:focus {
    outline: none !important;
    border-color: #C9A84C !important;
  }

  /* Search button */
  #IDX-searchForm input[type="submit"],
  #IDX-searchForm button[type="submit"],
  .IDX-btn-search {
    background: #1B2B4B !important;
    color: #fff !important;
    border: none !important;
    border-radius: 3px !important;
    padding: 0.65rem 1.75rem !important;
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    cursor: pointer !important;
    transition: background 0.2s ease !important;
  }

  #IDX-searchForm input[type="submit"]:hover,
  .IDX-btn-search:hover {
    background: #C9A84C !important;
    color: #fff !important;
  }

  /* Results grid */
  .IDX-resultsTable,
  #IDX-resultsTable {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 1.75rem !important;
    width: 100% !important;
    border: none !important;
  }

  .IDX-resultsTable tbody,
  .IDX-resultsTable tr { display: contents !important; }

  /* Result cards */
  .IDX-resultsCell,
  .IDX-propertyCell {
    display: flex !important;
    flex-direction: column !important;
    border: 1px solid rgba(27,43,75,0.09) !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    background: #fff !important;
    padding: 0 !important;
    box-shadow: 0 1px 4px rgba(27,43,75,0.06), 0 6px 20px rgba(27,43,75,0.06) !important;
    transition: transform 0.4s ease, box-shadow 0.4s ease !important;
  }

  .IDX-resultsCell:hover,
  .IDX-propertyCell:hover {
    transform: translateY(-4px) !important;
    box-shadow: 0 10px 36px rgba(27,43,75,0.15) !important;
  }

  .IDX-resultsCell img,
  .IDX-propertyCell img {
    width: 100% !important;
    height: 220px !important;
    object-fit: cover !important;
    display: block !important;
    transition: transform 0.9s ease !important;
  }

  .IDX-resultsCell:hover img,
  .IDX-propertyCell:hover img {
    transform: scale(1.04) !important;
  }

  .IDX-resultAddress,
  .IDX-resultsAddress {
    padding: 1rem 1.25rem 0.2rem !important;
    font-size: 1rem !important;
    font-weight: 600 !important;
    color: #1B2B4B !important;
  }

  .IDX-resultCity,
  .IDX-resultsCity {
    padding: 0 1.25rem 0.3rem !important;
    font-size: 0.8125rem !important;
    color: rgba(0,0,0,0.45) !important;
  }

  .IDX-resultPrice,
  .IDX-resultsPrice {
    padding: 0.4rem 1.25rem 1.2rem !important;
    font-size: 1.2rem !important;
    font-weight: 700 !important;
    color: #1B2B4B !important;
  }

  /* Pagination */
  .IDX-pagination a,
  .IDX-paginationWrapper a {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 2rem !important;
    height: 2rem !important;
    border-radius: 3px !important;
    font-size: 0.8125rem !important;
    color: #1B2B4B !important;
    text-decoration: none !important;
    border: 1px solid rgba(27,43,75,0.15) !important;
    transition: all 0.2s !important;
  }

  .IDX-pagination a:hover,
  .IDX-pagination a.IDX-active {
    background: #1B2B4B !important;
    color: #fff !important;
    border-color: #1B2B4B !important;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .IDX-resultsTable,
    #IDX-resultsTable {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 640px) {
    .IDX-resultsTable,
    #IDX-resultsTable {
      grid-template-columns: 1fr !important;
    }
  }
</style>
`;

// Safely injects IDX Broker embed codes that contain <script> and <style> tags.
// dangerouslySetInnerHTML does not execute scripts — we use useEffect to
// re-create script elements so the browser actually runs them.
function IdxEmbed({ code, minHeight = 600 }: { code: string; minHeight?: number }) {
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

  return <div ref={containerRef} className="w-full" style={{ minHeight }} />;
}

export function IdxSearch() {
  if (IDX_SEARCH_EMBED_CODE.trim()) {
    return (
      <div className="w-full overflow-hidden rounded-sm">
        <IdxEmbed code={IDX_SEARCH_EMBED_CODE} minHeight={700} />
      </div>
    );
  }

  // Placeholder shown until the property search embed code is added
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card px-8 py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
          <svg className="h-8 w-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-navy">Live MLS Search Coming Soon</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Every active listing from GSMLS, Jersey MLS, and Ocean/Monmouth MLS will appear
          here once the IDX Broker search widget is connected.
        </p>
        <div className="mt-8 space-y-2 text-left rounded-sm bg-navy/5 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy">To activate:</p>
          <ol className="mt-2 space-y-1.5 text-xs text-muted-foreground list-decimal list-inside">
            <li>Log into IDX Broker → Widgets → Property Search</li>
            <li>Copy the embed code</li>
            <li>Paste into <code className="text-navy font-mono">IDX_SEARCH_EMBED_CODE</code> in <code className="text-navy font-mono">IdxSearch.tsx</code></li>
          </ol>
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/50">
          Powered by IDX Broker
        </p>
      </div>
    </div>
  );
}
