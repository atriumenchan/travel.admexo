import { NextRequest, NextResponse } from "next/server";
import { searchAirports } from "@/lib/travelpayouts";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (q.length < 2) return NextResponse.json([]);

  try {
    const results = await searchAirports(q);
    return NextResponse.json(results, {
      headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
