import { NextResponse } from "next/server";
import { hasAdminSession, hasSameOrigin, isAdminConfigured } from "@/lib/admin-auth";
import { adminProductSchema } from "@/lib/admin-products-schema";
import { isDatabaseConfigured } from "@/lib/database";
import { deleteProduct, updateProduct } from "@/lib/product-repository";

type RouteContext = { params: Promise<{ id: string }> };

function parseId(value: string) {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : undefined;
}

export async function PUT(request: Request, { params }: RouteContext) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "The product database is not configured." }, { status: 503 });
  }

  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parsed = adminProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Check the product fields and try again.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    const product = await updateProduct(id, parsed.data);
    if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
    return NextResponse.json(product);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return NextResponse.json({ error: "A product with that URL slug already exists." }, { status: 409 });
    }
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23503"
    ) {
      return NextResponse.json({ error: "Select a category from the available category list." }, { status: 400 });
    }
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23514"
    ) {
      return NextResponse.json({ error: "Run npm run db:migrate before adding products to new categories." }, { status: 503 });
    }
    throw error;
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "The product database is not configured." }, { status: 503 });
  }

  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });

  const deleted = await deleteProduct(id);
  if (!deleted) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  return NextResponse.json({ deleted: true });
}
