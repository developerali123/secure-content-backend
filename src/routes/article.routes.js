const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const controller = require("../controllers/article.controller");

router.get("/", controller.list);
router.post("/", auth, role("ADMIN", "EDITOR"), controller.create);
router.put("/:id", auth, controller.update);
router.delete("/:id", auth, role("ADMIN"), controller.remove);

module.exports = router;
