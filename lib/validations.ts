import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPEG, PNG, and WebP formats are supported."
    ),
  isActive: z.boolean().optional(),
});

export const UpdateSeriesSchema = z.object({
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
    )
    .optional(),
  isActive: z.boolean().optional(),
});

export const UpdateSeriesStatusSchema = z.object({
  isActive: z.boolean(),
});

export const NewBrandSchema = z.object({
  name: z
    .string()
    .min(1, "Brand name is required!")
    .max(32, "Brand name must less than 32 characters!"),
  isActive: z.boolean().optional(),
});

export const NewGradeSchema = z.object({
  name: z
    .string()
    .min(1, "Grade name is required!")
    .max(32, "Grade name must less than 32 characters!"),
  isActive: z.boolean().optional(),
});

export const NewProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required!")
    .max(250, "Product name must less than 250 characters!"),
  slug: z.string(),
  description: z.string().min(2, "Product description is required"),
  dimensions: z.string().optional(),
  weight: z.number().optional(),
  price: z.number().positive(),
  quantity: z.number().positive(),
  status: z.enum(["DRAFT", "AVAILABLE", "SOLDOUT", "ARCHIVED"]),
  seriesId: z.string().min(1, "Product series is required"),
  brandId: z.string().min(1, "Product series is required"),
  gradeId: z.string().min(1, "Product series is required"),
  images: z.union([
    z.any().optional(),
    z
      .any()
      .refine(
        (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
  ]),
});

export const NewVoucherSchema = z
  .object({
    code: z.string().min(1, "Voucher code is required").max(32),
    description: z.string().optional(),
    type: z.string(),
    value: z.number().min(0),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    usageLimit: z.number().optional(),
    usageCount: z.number().optional(),
    minPurchaseAmount: z.number().optional(),
    isActive: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be later than start date",
      path: ["endDate"],
    }
  );

export const NewPaymentMethodSchema = z.object({
  name: z
    .string()
    .min(1, "Payment Method name is required!")
    .max(32, "Payment Method name must less than 32 characters!"),
  isActive: z.boolean().optional(),
});
