import { z } from "zod";

export const AdminLoginSchema = z.object({
  identifier: z.string().min(4, "Username atau Email harus diisi."),
  password: z.string().min(8).max(32),
});
