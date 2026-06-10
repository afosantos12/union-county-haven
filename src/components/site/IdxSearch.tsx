import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS
//
// 1. Log into IDX Broker → Leads & Listings → Widgets → Property Search
// 2. Copy the embed/widget code and paste it into IDX_SEARCH_EMBED_CODE below.
// 3. In your IDX Broker account settings, whitelist the site's domain under
//    "Approved Domains" — the widget will silently fail without this step.
//
// Once connected:
// - Listing photos, prices, statuses, and MLS details come directly from
//   IDX Broker, which syncs from GSMLS, Jersey MLS, and Ocean/Monmouth MLS.
// - New active listings appear automatically — no manual website updates needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_SEARCH_EMBED_CODE = "";

// Safely renders IDX Broker embed codes that may contain <script> tags.
// dangerouslySetInnerHTML does not execute scripts, so we use useEffect to
// parse the HTML, clone non-script nodes, and re-create script elements so
// the browser actually runs them.
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

    return () => {
      container.innerHTML = "";
    };
  }, [code]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ minHeight }}
    />
  );
}

export function IdxSearch() {
  if (IDX_SEARCH_EMBED_CODE) {
    return (
      <div className="w-full overflow-hidden rounded-sm">
        <IdxEmbed code={IDX_SEARCH_EMBED_CODE} minHeight={700} />
      </div>
    );
  }

  // Placeholder shown until embed code is added
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card px-8 py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
          <svg
            className="h-8 w-8 text-navy"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
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
            <li>Paste it into <code className="text-navy font-mono">IDX_SEARCH_EMBED_CODE</code> in <code className="text-navy font-mono">IdxSearch.tsx</code></li>
          </ol>
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/50">
          Powered by IDX Broker
        </p>
      </div>
    </div>
  );
}
