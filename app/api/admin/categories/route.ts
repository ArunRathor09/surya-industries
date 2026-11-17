import { NextResponse } from "next/server";
import { adminCategorySchema } from "@/lib/admin-categories-schema";
import { hasAdminSession, hasSameOrigin, isAdminConfigured } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/database";
import { createProductCategory, getProductCategories } from "@/lib/product-repository";

function isMissingCategoryTable(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "42P01"
  );
}

export async function GET() {
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "The product database is not configured." }, { status: 503 });
  }

  try {
    return NextResponse.json(await getProductCategories(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (isMissingCategoryTable(error)) {
      return NextResponse.json(
        { error: "Run npm run db:migrate to enable category management." },
        { status: 503 },
      );
    }
    throw error;
  }
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "The product database is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parsed = adminCategorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Category names must contain 2–80 characters.", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  try {
    return NextResponse.json(
      { name: await createProductCategory(parsed.data.name) },
      { status: 201 },
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "23505"
    ) {
      return NextResponse.json({ error: "That category already exists." }, { status: 409 });
    }
    if (isMissingCategoryTable(error)) {
      return NextResponse.json(
        { error: "Run npm run db:migrate to enable category management." },
        { status: 503 },
      );
    }
    throw error;
  }
}
