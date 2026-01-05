const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "EDITOR", "VIEWER"]).optional(),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
