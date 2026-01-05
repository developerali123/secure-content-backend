const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/jwt");

exports.register = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return signToken({ id: user.id, role: user.role });
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  return signToken({ id: user.id, role: user.role });
};
