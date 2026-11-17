import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { hasAdminSession, hasSameOrigin, isAdminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";

const maxImageBytes = 5 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function detectImageType(bytes: Buffer) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  if (bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") {
    return "image/webp";
  }
  if (
    bytes.toString("ascii", 4, 8) === "ftyp" &&
    ["avif", "avis"].includes(bytes.toString("ascii", 8, 12))
  ) {
    return "image/avif";
  }
  return undefined;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  if (!isAdminConfigured() || !(await hasAdminSession())) {
    return NextResponse.json({ error: "Admin sign-in is required." }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxImageBytes + 64_000) {
    return NextResponse.json({ error: "Choose an image smaller than 5 MB." }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Choose a valid image file." }, { status: 400 });
  }

  const file = formData.get("image");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }
  if (file.size === 0 || file.size > maxImageBytes) {
    return NextResponse.json({ error: "Choose an image between 1 byte and 5 MB." }, { status: 413 });
  }
  if (!allowedImageTypes.has(file.type)) {
    return NextResponse.json({ error: "Use a JPEG, PNG, WebP, or AVIF image." }, { status: 415 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (detectImageType(bytes) !== file.type) {
    return NextResponse.json({ error: "The selected file is not a valid supported image." }, { status: 415 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET." },
      { status: 503 },
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    const uploaded = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "surya-industries/products",
          public_id: randomUUID(),
          resource_type: "image",
          overwrite: false,
        },
        (error, result) => {
          if (error) reject(error);
          else if (!result) reject(new Error("Cloudinary returned no image details."));
          else resolve(result);
        },
      );
      uploadStream.on("error", reject);
      Readable.from([bytes]).pipe(uploadStream);
    });

    const url = cloudinary.url(uploaded.public_id, {
      secure: true,
      transformation: [
        { width: 1600, crop: "limit", quality: "auto", fetch_format: "auto" },
      ],
    });
    return NextResponse.json({ url, width: uploaded.width, height: uploaded.height });
  } catch (error) {
    console.error(
      "Cloudinary product image upload failed.",
      error instanceof Error ? error.message : "Unknown upload error.",
    );
    return NextResponse.json(
      { error: "Image upload failed. Check Cloudinary configuration and try again." },
      { status: 502 },
    );
  }
}
