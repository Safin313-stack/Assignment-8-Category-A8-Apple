import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/tiles/${id}`);
  const data = await res.json();
  return NextResponse.json(data);
}
