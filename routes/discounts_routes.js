const Router = require("express");
const router = new Router();
const discountController = require("../controller/discount_controller");

router.post("/discount", discountController.createDiscount);
router.get("/discounts", discountController.getDiscounts);
router.get("discount/:id", discountController.getDiscountForProduct);
router.put("/discount/:id", discountController.updateDiscount);
router.delete("/discount/:id", discountController.deleteDiscount);


module.exports = router;