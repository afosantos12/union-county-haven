import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import heroTeam from "@/assets/hero-team.jpg";
import michelleAsset from "@/assets/team-michelle.png.asset.json";
import afonsoAsset from "@/assets/team-afonso.jpg.asset.json";
import dessireAsset from "@/assets/team-dessire.png.asset.json";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Michelle David Realty Group" },
      {
        name: "description",
        content:
          "Meet the REALTORS® behind Michelle David Realty Group — dedicated NJ real estate professionals serving buyers, sellers, renters, and investors.",
      },
      { property: "og:title", content: "Meet Our Team — Michelle David Realty Group" },
      {
        property: "og:description",
        content:
          "Broker/Owner Michelle David and her team of bilingual REALTORS® serving all of New Jersey.",
      },
      { property: "og:image", content: heroTeam },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

type TeamMember = {
  name: string;
  title: string;
  image: string;
  bio: string[];
};

const team: TeamMember[] = [
  {
    name: "Afonso Santos",
    title: "REALTOR®",
    image: afonsoAsset.url,
    bio: [
      "Afonso Santos is a REALTOR® with Michelle David Realty Group, committed to helping buyers, sellers, renters, and investors achieve their real estate goals. Growing up in a family involved in real estate investing, he developed a passion for the industry and enjoys helping clients navigate every step of the real estate process.",
      "As a New Jersey native who is fluent in both English and Portuguese, Afonso prides himself on providing personalized service, honest communication, and a smooth real estate experience for every client.",
    ],
  },
  {
    name: "Dessire Vega",
    title: "REALTOR®",
    image: dessireAsset.url,
    bio: [
      "Dessire Vega is a bilingual REALTOR® with Michelle David Realty Group, proudly serving New Jersey. She is committed to making real estate accessible and transparent for every client. Whether you are buying, selling, investing, renting, or simply curious about the market, Dessire guides you with honesty, dedication, and a personal touch every step of the way.",
      "She will answer your questions throughout the process, and if she doesn't have the answer right away, she will find it for you.",
      "Professional, dedicated, and trusted. Hablo Español.",
    ],
  },
];

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-card-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-luxury">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={member.image}
          alt={`${member.name}, ${member.title} at Michelle David Realty Group`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-2xl text-navy">{member.name}</h3>
        <p className="eyebrow mt-2">{member.title}</p>
        <div className="hairline my-5 w-12" />
        <div className="space-y-3 text-sm leading-relaxed text-foreground/75">
          {member.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

function TeamPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Team"
        title={
          <>
            Meet Our <span className="italic text-gold">Team</span>
          </>
        }
        subtitle="Dedicated real estate professionals committed to helping buyers, sellers, renters, and investors achieve their goals throughout New Jersey."
        image={heroTeam}
        imageAlt="Elegant luxury real estate office interior"
      />

      {/* Featured: Michelle */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-sm bg-gradient-to-br from-gold/30 to-navy/10 blur-xl" />
                <div className="relative overflow-hidden rounded-sm border border-gold/40 shadow-luxury">
                  <img
                    src={michelleAsset.url}
                    alt="Michelle David, Broker and Owner of Michelle David Realty Group"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 border-2 border-gold sm:block" />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow">Broker · Owner · Founder</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-6xl">
                Michelle <span className="italic text-gold">David</span>
              </h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.22em] text-foreground/60">
                Broker / Owner
              </p>
              <div className="hairline my-7 w-20" />
              <div className="space-y-5 text-base leading-relaxed text-foreground/80">
                <p>
                  Michelle David is the Broker/Owner of Michelle David Realty Group and has been
                  helping buyers, sellers, investors, landlords, and commercial real estate clients
                  achieve their real estate goals for more than 22 years. Known for her dedication,
                  market expertise, and personalized service, Michelle is committed to making every
                  transaction—whether residential or commercial—as smooth and successful as
                  possible.
                </p>
                <p>
                  Having lived in Kenilworth and New Jersey for more than 30 years, she combines
                  in-depth local knowledge with innovative marketing strategies and strong
                  negotiation skills to help her clients achieve the best possible results. Michelle
                  works with both residential and commercial real estate, assisting clients with
                  everything from buying and selling homes to commercial properties and investment
                  opportunities. Her goal is simple: to provide exceptional service while building
                  lasting relationships based on trust and integrity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">The Group</p>
            <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">
              Our REALTORS<span className="text-gold">®</span>
            </h2>
            <p className="mt-5 text-base text-foreground/70">
              A bilingual, deeply local team — ready to guide you across every corner of the
              Garden State.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:gap-10">
            {team.map((m) => (
              <TeamMemberCard key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-navy text-white">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center lg:px-10 lg:py-24">
          <p className="eyebrow" style={{ color: "var(--gold)" }}>
            Let's Talk
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
            Ready to Work With <span className="italic text-gold">Our Team?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            Whether you're buying, selling, renting, or investing, we're here to help.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="rounded-sm bg-gold px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-gold-foreground transition-all hover:bg-transparent hover:text-gold hover:ring-1 hover:ring-gold"
            >
              Contact Us
            </Link>
            <Link
              to="/buy"
              className="rounded-sm border border-white/40 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-all hover:border-gold hover:text-gold"
            >
              View Listings
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
