const Router = require("express");
const router = new Router();
const productController = require("../controller/product_controller");

router.post("/product", productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getOneProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);


module.exports = router;