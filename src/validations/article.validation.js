const { z } = require("zod");

exports.articleSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  status: z.enum(["DRAFT", "PUBLISHED"]).optional(),
});
