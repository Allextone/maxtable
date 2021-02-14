const Router = require("express");
const router = new Router();
const discountController = require("../controller/discount_controller");

router.get("/discounts", discountController.all);
router.get("discount/:id", discountController.one);
router.post("/discount", discountController.create);
router.put("/discount/:id", discountController.update);
router.delete("/discount/:id", discountController.delete);


module.exports = router;