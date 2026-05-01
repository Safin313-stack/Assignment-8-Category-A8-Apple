import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getTile(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/tiles/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

type Props = { params: Promise<{ id: string }> };

export default async function TileDetailPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { id } = await params;
  const tile = await getTile(id);

  if (!tile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <p className="font-display text-5xl mb-4">404</p>
          <p className="text-[#f0ece0]/60 font-body mb-6">Tile not found.</p>
          <Link href="/all-tiles" className="text-[#c9a84c] underline font-body text-sm">
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link href="/all-tiles" className="text-xs text-[#c9a84c]/60 hover:text-[#c9a84c] uppercase tracking-widest font-body mb-10 inline-block transition-colors">
          ← Back to Gallery
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
          <div className="relative aspect-square rounded-sm overflow-hidden border border-[#c9a84c]/20">
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-2 font-body">{tile.category}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">{tile.title}</h1>
            <p className="text-sm text-[#f0ece0]/50 mb-6 font-body">By {tile.creator}</p>
            <div className="w-12 h-px bg-[#c9a84c]/40 mb-6" />
            <p className="text-[#f0ece0]/70 font-body leading-relaxed mb-8">{tile.style || tile.description}</p>
            {tile.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tile.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 text-xs border border-[#c9a84c]/30 text-[#c9a84c]/80 tracking-widest uppercase font-body">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Material", value: tile.material },
                { label: "Dimensions", value: tile.dimensions },
                { label: "Availability", value: tile.inStock ? "In Stock" : "Out of Stock" },
                { label: "Currency", value: tile.currency },
              ].map(({ label, value }) => (
                <div key={label} className="border border-[#c9a84c]/10 p-3 rounded-sm">
                  <p className="text-xs text-[#f0ece0]/40 uppercase tracking-widest font-body mb-1">{label}</p>
                  <p className="text-sm font-body text-[#f0ece0]">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display text-3xl gold-text font-bold">
                {tile.currency} {tile.price?.toFixed(2)}
              </span>
              <button
                className="px-8 py-3 text-xs tracking-widest uppercase font-body font-medium"
                style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a" }}
              >
                Inquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
