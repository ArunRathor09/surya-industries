import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import {
  adminSessionCookie,
  createAdminSession,
  hasSameOrigin,
  hasAdminSession,
  isAdminConfigured,
  matchesAdminCredentials,
} from "@/lib/admin-auth";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(200),
});

export async function GET() {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set the required environment variables." },
      { status: 503 },
    );
  }
  return NextResponse.json({ authenticated: await hasAdminSession() });
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login is not configured. Set the required environment variables." },
      { status: 503 },
    );
  }

  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request body." }, { status: 400 });
  }

  const parsed = credentialsSchema.safeParse(body);
  if (!parsed.success || !matchesAdminCredentials(parsed.data.email, parsed.data.password)) {
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  const session = createAdminSession();
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(adminSessionCookie.name, session.value, {
    ...adminSessionCookie,
    expires: session.expiresAt,
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(adminSessionCookie.name, "", { ...adminSessionCookie, maxAge: 0 });
  return response;
}
