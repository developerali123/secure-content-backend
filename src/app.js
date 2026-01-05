const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const articleRoutes = require("./routes/article.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

app.use(errorHandler);

module.exports = app;
