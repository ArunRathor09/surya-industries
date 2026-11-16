import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "spi_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

export function isAdminConfigured() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  return Boolean(
    email &&
      !email.endsWith("@example.com") &&
      password &&
      password.length >= 12 &&
      !password.startsWith("replace-with-") &&
      secret &&
      secret.length >= 32 &&
      !secret.startsWith("replace-with-"),
  );
}

function getAuthSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return secret;
}

function signature(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("base64url");
}

function isValidSession(value: string | undefined) {
  if (!value) return false;
  const [payload, providedSignature] = value.split(".");
  if (!payload || !providedSignature) return false;

  const expectedSignature = signature(payload);
  const expected = Buffer.from(expectedSignature);
  const provided = Buffer.from(providedSignature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
    return false;
  }

  const [email, expiry] = Buffer.from(payload, "base64url").toString().split("|");
  return email === process.env.ADMIN_EMAIL && Number(expiry) > Date.now();
}

export function createAdminSession() {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = Buffer.from(`${process.env.ADMIN_EMAIL}|${expiresAt}`).toString("base64url");
  return {
    value: `${payload}.${signature(payload)}`,
    expiresAt: new Date(expiresAt),
  };
}

export async function hasAdminSession() {
  const cookieStore = await cookies();
  return isValidSession(cookieStore.get(COOKIE_NAME)?.value);
}

export function matchesAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  const suppliedEmail = Buffer.from(email.trim().toLowerCase());
  const configuredEmail = Buffer.from(expectedEmail.trim().toLowerCase());
  const suppliedPassword = Buffer.from(password);
  const configuredPassword = Buffer.from(expectedPassword);

  const emailMatches =
    suppliedEmail.length === configuredEmail.length &&
    timingSafeEqual(suppliedEmail, configuredEmail);
  const passwordMatches =
    suppliedPassword.length === configuredPassword.length &&
    timingSafeEqual(suppliedPassword, configuredPassword);

  return emailMatches && passwordMatches;
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export const adminSessionCookie = {
  name: COOKIE_NAME,
  maxAge: SESSION_TTL_SECONDS,
  httpOnly: true,
  sameSite: "strict" as const,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};
