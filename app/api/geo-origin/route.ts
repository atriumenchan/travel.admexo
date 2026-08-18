import { NextRequest, NextResponse } from "next/server";
import { detectVisitorOrigin, FALLBACK_ORIGIN } from "@/lib/geoOrigin";

export async function GET(req: NextRequest) {
  try {
    const origin = await detectVisitorOrigin(req.headers);
    return NextResponse.json(origin, {
      headers: { "Cache-Control": "private, max-age=1800" },
    });
  } catch {
    return NextResponse.json(FALLBACK_ORIGIN, {
      headers: { "Cache-Control": "private, max-age=300" },
    });
  }
}
