import { z } from "zod";

export const adminCategorySchema = z.object({
  name: z.string().trim().min(2).max(80).transform((name) => name.replace(/\s+/g, " ")),
});
