import { Bed, Bath, Square, MapPin } from "lucide-react";
import l1 from "@/assets/listing-1.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";

const listings = [
  {
    img: l1,
    price: "$2,495,000",
    address: "418 Wychwood Road",
    city: "Westfield, NJ",
    beds: 5,
    baths: 4.5,
    sqft: "4,820",
    status: "New Listing",
  },
  {
    img: l2,
    price: "$1,875,000",
    address: "27 Hillcrest Avenue",
    city: "Summit, NJ",
    beds: 4,
    baths: 3.5,
    sqft: "3,640",
    status: "Just Listed",
  },
  {
    img: l3,
    price: "$1,250,000",
    address: "92 Orchard Street",
    city: "Cranford, NJ",
    beds: 4,
    baths: 3,
    sqft: "2,980",
    status: "Open Sunday",
  },
];

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
            href="#search"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-navy"
          >
            View all properties
            <span className="h-px w-10 bg-navy transition-all group-hover:w-16 group-hover:bg-gold" />
          </a>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((p) => (
            <article
              key={p.address}
              className="group cursor-pointer overflow-hidden rounded-sm bg-card shadow-card-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.address}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-sm bg-navy/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-widest text-gold backdrop-blur">
                  {p.status}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-serif text-2xl text-navy">{p.price}</div>
                </div>
                <h3 className="mt-2 font-serif text-lg text-foreground">{p.address}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.city}
                </p>

                <div className="mt-5 flex items-center gap-5 border-t border-border pt-4 text-sm text-foreground/80">
                  <span className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4 text-gold" /> {p.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4 text-gold" /> {p.baths}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Square className="h-4 w-4 text-gold" /> {p.sqft}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
