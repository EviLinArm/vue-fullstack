const router = require("express-promise-router")();

const { category } = require("../controllers");
const checkJWTSign = require('../middlewares/jwtCheck.middleware')

router.route("/:id").get(checkJWTSign, category.get);
router.route("/").post(category.create);
router.route("/").get(checkJWTSign, category.getAll);
router.route("/:id").put(category.update);
router.route("/:id").delete(category.delete);

module.exports = router;