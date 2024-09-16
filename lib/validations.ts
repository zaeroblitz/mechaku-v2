import { z } from "zod";

export const AdminLoginSchema = z.object({
  identifier: z.string().min(4, "Username atau Email harus diisi."),
  password: z.string().min(8).max(32),
});

export const NewSeriesSchema = z.object({
  title: z
    .string()
    .min(1, "Series title is required!")
    .max(32, "Series title must less than 32 characters!"),
  author: z.string().max(32).optional(),
  description: z.string().optional(),
  image: z
    .instanceof(File, { message: "Please upload a file!" })
    .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    ),
  isActive: z.boolean().optional(),
});
