import Link from "next/link";
import FeaturedSwiper from "@/components/FeaturedSwiper";

async function getFeaturedTiles() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/tiles?_limit=4`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const tiles = await res.json();
    return tiles;
  } catch {
    return [];
  }
}

const marqueeText =
  "New Arrivals: Ceramic Blue Tile | Weekly Feature: Modern Geometric Patterns | Join the Community | Handcrafted Excellence | 500+ Premium Tiles | New Arrivals: Marble White Classic | Art Deco Gold Series | ";

export default async function HomePage() {
  const featuredTiles = await getFeaturedTiles();

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, rgba(201,168,76,0.08) 0%, transparent 70%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 60%), #0f0e0a",
            }}
          />
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-6 font-body animate__animated animate__fadeInDown">
            ✦ Premium Tile Gallery ✦
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 animate__animated animate__fadeIn">
            Discover Your
            <br />
            <span className="gold-text italic">Perfect Aesthetic</span>
          </h1>
          <p className="text-[#f0ece0]/60 text-lg md:text-xl max-w-xl mx-auto mb-10 font-body leading-relaxed animate__animated animate__fadeInUp">
            Curated tiles for spaces that deserve more than the ordinary. From ceramic to marble, find the surface that speaks your language.
          </p>
          <Link
            href="/all-tiles"
            className="inline-block px-10 py-4 text-sm tracking-[0.3em] uppercase font-body font-medium animate__animated animate__fadeInUp animate__delay-1s"
            style={{
              background: "linear-gradient(135deg, #c9a84c, #f0d080)",
              color: "#0f0e0a",
            }}
          >
            Browse Now
          </Link>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-4 border-y border-[#c9a84c]/20" style={{ background: "#0a0908" }}>
        <div className="marquee-container">
          <div className="marquee-track">
            <span className="text-xs tracking-widest uppercase text-[#c9a84c]/60 font-body">
              {marqueeText.repeat(2)}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Tiles */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3 font-body">Handpicked</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Featured Tiles</h2>
        </div>

        {featuredTiles.length === 0 ? (
          <div className="text-center py-20 text-[#f0ece0]/40">
            <p className="font-body">Start the JSON server to see tiles.</p>
            <p className="text-sm mt-2 font-mono text-[#c9a84c]/40">npm run json-server</p>
          </div>
        ) : (
          <FeaturedSwiper tiles={featuredTiles} />
        )}

        <div className="text-center mt-12">
          <Link
            href="/all-tiles"
            className="inline-block px-8 py-3 text-xs tracking-widest uppercase font-body border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-colors"
          >
            View All Tiles →
          </Link>
        </div>
      </section>

    </div>
  );
}
