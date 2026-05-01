import { NextRequest, NextResponse } from "next/server";
import tilesData from "@/data/tiles.json";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tile = tilesData.tiles.find((t) => t.id === params.id);

  if (!tile) {
    return NextResponse.json({ error: "Tile not found" }, { status: 404 });
  }

  return NextResponse.json(tile);
}
