import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// IDX Broker Search / Map Widget — Listings Page
//
// To activate:
// 1. Log into IDX Broker → Leads & Listings → Widgets
// 2. Choose "Map Search" or "Quick Search" and copy the embed code
// 3. Paste it into IDX_SEARCH_EMBED_CODE below
// 4. Whitelist the site domain in IDX Broker → Account Settings → Approved Domains
//
// Once connected, visitors can search all active MLS listings from GSMLS,
// Jersey MLS, and Ocean/Monmouth MLS directly on this page.
// New listings appear automatically — no manual site updates needed.
// ─────────────────────────────────────────────────────────────────────────────
const IDX_SEARCH_EMBED_CODE = `<script charset="UTF-8" type="text/javascript" id="idxwidgetsrc-44007" src="//michelledavidrealtygroup.idxbroker.com/idx/mapwidgetjs.php?widgetid=44007"></script>`;

function IdxWidget({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    container.innerHTML = "";

    const template = document.createElement("template");
    template.innerHTML = code;

    Array.from(template.content.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName === "SCRIPT") {
        const orig = node as HTMLScriptElement;
        const script = document.createElement("script");
        Array.from(orig.attributes).forEach((a) => script.setAttribute(a.name, a.value));
        if (!orig.src) script.textContent = orig.textContent;
        container.appendChild(script);
      } else {
        container.appendChild(node.cloneNode(true));
      }
    });

    return () => { container.innerHTML = ""; };
  }, [code]);

  return <div ref={ref} className="w-full min-h-[700px]" />;
}

export function IdxSearch() {
  if (IDX_SEARCH_EMBED_CODE.trim()) {
    return (
      <div className="w-full">
        <IdxWidget code={IDX_SEARCH_EMBED_CODE} />
      </div>
    );
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card px-8 py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
          <svg className="h-8 w-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-navy">MLS Search Widget</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Paste your IDX Broker Map Search or Quick Search embed code into
          <code className="mx-1 rounded bg-navy/8 px-1.5 py-0.5 font-mono text-xs text-navy">
            IDX_SEARCH_EMBED_CODE
          </code>
          in <code className="font-mono text-xs text-navy">IdxSearch.tsx</code> to
          activate live MLS search for GSMLS, Jersey MLS, and Ocean/Monmouth MLS.
        </p>
        <div className="mt-8 rounded-sm bg-navy/5 px-5 py-4 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy">Steps:</p>
          <ol className="mt-3 space-y-2 text-xs text-muted-foreground list-decimal list-inside">
            <li>IDX Broker → Leads & Listings → Widgets</li>
            <li>Select Map Search or Quick Search → copy embed code</li>
            <li>Paste into <code className="font-mono text-navy">IDX_SEARCH_EMBED_CODE</code></li>
            <li>Whitelist domain in IDX Broker → Account Settings → Approved Domains</li>
          </ol>
        </div>
        <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground/50">
          Powered by IDX Broker
        </p>
      </div>
    </div>
  );
}
