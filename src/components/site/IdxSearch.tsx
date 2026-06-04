const IDX_EMBED_CODE = ""; // ← Paste IDX Broker embed code here when client provides it

export function IdxSearch() {
  if (IDX_EMBED_CODE) {
    return (
      <div
        className="w-full min-h-[600px]"
        dangerouslySetInnerHTML={{ __html: IDX_EMBED_CODE }}
      />
    );
  }

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-card px-8 py-20 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-navy/10">
          <svg className="h-8 w-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-navy">IDX Search Coming Soon</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Live MLS listings from GSMLS, Jersey MLS, and Ocean/Monmouth MLS will appear here once
          the IDX Broker embed code is connected.
        </p>
        <p className="mt-6 text-xs text-muted-foreground/60 uppercase tracking-widest">
          Powered by IDX Broker
        </p>
      </div>
    </div>
  );
}
