const Router = require("express");
const router = new Router();
const productController = require("../controller/product_controller");

router.get("/products", productController.all);
router.get("/product/:id", productController.one);
router.post("/product", productController.create);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);


module.exports = router;