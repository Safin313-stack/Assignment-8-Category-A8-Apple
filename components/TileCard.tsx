import Image from "next/image";
import Link from "next/link";

interface Tile {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  currency: string;
  dimensions: string;
  material: string;
  inStock: boolean;
  tags?: string[];
}

export default function TileCard({ tile }: { tile: Tile }) {
  return (
    <div className="tile-card rounded-sm overflow-hidden border border-[#c9a84c]/15 bg-[#1a1915] group">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={tile.image}
          alt={tile.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {!tile.inStock && (
          <div className="absolute top-2 right-2 bg-black/70 text-xs px-2 py-1 rounded text-[#f0ece0]/60 uppercase tracking-widest">
            Out of Stock
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0a] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-4">
        <p className="text-xs text-[#c9a84c] uppercase tracking-widest mb-1 font-body">{tile.category}</p>
        <h3 className="font-display text-lg font-semibold text-[#f0ece0] mb-1">{tile.title}</h3>
        <p className="text-sm text-[#f0ece0]/50 line-clamp-2 mb-3 font-body">{tile.description}</p>

        <div className="flex items-center justify-between">
          <span className="font-display text-[#c9a84c] font-semibold">
            {tile.currency} {tile.price.toFixed(2)}
          </span>
          <Link
            href={`/tile/${tile.id}`}
            className="btn btn-xs tracking-widest uppercase text-xs"
            style={{ background: "linear-gradient(135deg,#c9a84c,#f0d080)", color: "#0f0e0a", border: "none" }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
