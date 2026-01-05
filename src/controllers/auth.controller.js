const { register, login } = require("../services/auth.service");
const { registerSchema, loginSchema } = require("../validations/auth.validation");

exports.register = async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const token = await register(data);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = loginSchema.parse(req.body);
    const token = await login(data);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
