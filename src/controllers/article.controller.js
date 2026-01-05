const service = require("../services/article.service");
const { articleSchema } = require("../validations/article.validation");

exports.create = async (req, res, next) => {
  try {
    const data = articleSchema.parse(req.body);
    const article = await service.createArticle(data, req.user.id);
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const articles = await service.getArticles(page, limit);
  res.json(articles);
};

exports.update = async (req, res, next) => {
  try {
    const data = articleSchema.partial().parse(req.body);
    const article = await service.updateArticle(req.params.id, data, req.user);
    res.json(article);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await service.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
