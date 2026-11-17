import { NextResponse } from "next/server";
import { getProducts, getProductsBySlugs } from "@/lib/product-repository";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const slugs = new URL(request.url).searchParams.getAll("slug");
  if (slugs.length > 100) {
    return NextResponse.json({ error: "Request at most 100 product slugs." }, { status: 400 });
  }

  const products = slugs.length > 0
    ? await getProductsBySlugs(slugs)
    : await getProducts();
  return NextResponse.json(products, {
    headers: { "Cache-Control": "no-store" },
  });
}
