"use client";
import { useState, useEffect, useCallback } from "react";
import TileCard from "@/components/TileCard";
import Loader from "@/components/Loader";

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

export default function AllTilesPage() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchTiles = useCallback(() => {
    const url = search
      ? `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/tiles?title_like=${encodeURIComponent(search)}`
      : `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/tiles`;

    fetch(url)
      .then((r) => r.json())
      .then((data: Tile[]) => {
        setTiles(data);
        setLoading(false);
      })
      .catch(() => {
        setTiles([]);
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(fetchTiles, 0);
    return () => clearTimeout(timer);
  }, [fetchTiles]);

  return (
    <div className="min-h-screen">
      <div className="py-20 text-center" style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%), #0f0e0a" }}>
        <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-3 font-body">The Collection</p>
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">All Tiles</h1>
        <div className="max-w-lg mx-auto px-4">
          <input
            type="text"
            placeholder="Search tiles by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 bg-[#1a1915] border border-[#c9a84c]/30 text-[#f0ece0] placeholder-[#f0ece0]/30 focus:outline-none focus:border-[#c9a84c] transition-colors text-sm font-body tracking-wide"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <Loader />
        ) : tiles.length === 0 ? (
          <div className="text-center py-20 text-[#f0ece0]/40">
            <p className="font-display text-2xl mb-2">No tiles found</p>
            <p className="text-sm font-body">Try a different search or start the JSON server.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-[#f0ece0]/40 tracking-widest uppercase mb-8 font-body">
              {tiles.length} tile{tiles.length !== 1 ? "s" : ""} found
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tiles.map((tile) => (
                <TileCard key={tile.id} tile={tile} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
