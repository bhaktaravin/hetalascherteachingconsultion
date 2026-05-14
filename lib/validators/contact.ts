import { z } from "zod";

export const contactRoleSchema = z.enum([
  "teacher",
  "instructional_coach",
  "administrator",
  "parent",
  "other",
]);

export const contactTopicSchema = z.enum([
  "instructional_coaching",
  "professional_learning",
  "curriculum_assessment",
  "multilingual_learners",
  "leadership_systems",
  "other",
]);

export const contactSubmissionSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  role: contactRoleSchema,
  topic: contactTopicSchema,
  message: z.string().trim().min(10).max(8000),
  website: z.string().max(200).optional(),
});
