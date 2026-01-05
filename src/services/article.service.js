const prisma = require("../config/prisma");

exports.createArticle = (data, userId) =>
  prisma.article.create({ data: { ...data, authorId: userId } });

exports.getArticles = (page, limit) =>
  prisma.article.findMany({
    where: { status: "PUBLISHED" },
    skip: (page - 1) * limit,
    take: limit,
    include: { author: true },
  });

exports.updateArticle = async (id, data, user) => {
  const article = await prisma.article.findUnique({ where: { id } });
  if (!article) throw new Error("Not found");

  if (user.role !== "ADMIN" && article.authorId !== user.id)
    throw new Error("Forbidden");

  return prisma.article.update({ where: { id }, data });
};

exports.deleteArticle = (id) =>
  prisma.article.delete({ where: { id } });
