import { z } from "zod";

const statusSchema = z.enum(["draft", "published"]);

export const createPostSchema = z.object({
  title: z.string().min(3).max(180),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be kebab-case"),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  authorName: z.string().min(2).max(120),
  status: statusSchema.default("draft"),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updatePostSchema = createPostSchema.partial().refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});
