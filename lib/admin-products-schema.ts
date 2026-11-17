import { z } from "zod";

const optionalText = z.string().trim().max(8000);

export const adminProductSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(2)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().trim().min(2).max(180),
  category: z.string().trim().min(2).max(80),
  summary: z.string().trim().min(5).max(500),
  description: optionalText,
  price: z
    .number()
    .finite()
    .nonnegative()
    .max(9_999_999_999.99)
    .refine((value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-8, {
      message: "Price can have at most two decimal places.",
    })
    .nullable(),
  image: z.string().trim().max(1000),
  imageAlt: z.string().trim().max(300),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  features: z.array(z.string()),
  applications: z.array(z.string()).optional(),
  guideSections: z.array(z.object({
    title: z.string(),
    paragraphs: z.array(z.string()).optional(),
    bullets: z.array(z.string()).optional(),
    steps: z.array(z.string()).optional(),
    table: z.object({ headers: z.array(z.string()), rows: z.array(z.array(z.string())) }).optional(),
    note: z.string().optional(),
  })).optional(),
  protectionRadius: z.array(z.object({
    height: z.number(),
    level1: z.number(),
    level2: z.number(),
    level3: z.number(),
    level4: z.number(),
  })).optional(),
});
