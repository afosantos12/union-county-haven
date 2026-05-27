const stats = [
  { value: "$420M+", label: "Lifetime Sales Volume" },
  { value: "650+", label: "Families Served" },
  { value: "12 Days", label: "Avg. Days on Market" },
  { value: "100%", label: "List-to-Sale Ratio" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-16 md:grid-cols-4 lg:px-10 lg:py-20">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-serif text-4xl text-navy md:text-5xl">{s.value}</div>
            <div className="mt-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
