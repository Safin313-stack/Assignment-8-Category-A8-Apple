import { NextRequest, NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  let tiles = tilesData.tiles;

  if (search) {
    tiles = tiles.filter((tile) =>
      tile.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    tiles = tiles.filter((tile) => tile.category === category);
  }

  return NextResponse.json(tiles);
}
