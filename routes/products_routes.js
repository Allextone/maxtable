const Router = require("express");
const router = new Router();
const productController = require("../controller/product_controller");

// Получаем все товары
router.get("/products", async (req, res, next) => {
    const resultOfGetAllProducts = await productController.all();
    if(resultOfGetAllProducts === Error) {
        return res.sendStatus(500).json(Error);
    } else {
        return res.sendStatus(200).json(resultOfGetAllProducts);
    };
});

// Получаем конкретный товар
router.get("/product/:id", async (req, res, next) => {
    if(!req.params.id) return res.sendStatus(400).send("Product ID is not specified.");
    const id = req.params.id;
    const result = null;
    const resultOfGetOneProduct = await productController.one(id, result);
    if(resultOfGetOneProduct === Error) {
        return res.sendStatus(500).json(Error);
    } else {
        return res.sendStatus(200).json(resultOfGetOneProduct);
    };
});

//Добавляем товар
router.post("/product", async (req, res, next) => {
    if(!req.body) return res.sendStatus(400).send("Product parameters are not specified.");
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_description: req.body.product_description
    };
    const result = null;
    const resultOfCreateProduct = await productController.create(product, result);
    if (resultOfCreateProduct === Error) {
        return res.sendStatus(500).json(Error);
    } else {
        return res.sendStatus(200).send("The product has been created.");
    }
});

// Обновляем товар
router.put("/product/:id", async (req, res, next) => {
    if(!req.params.id) return res.sendStatus(400).send("Product ID is not specified.");
    if(!req.body) return res.sendStatus(400).send("Product parameters are not specified.");
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_description: req.body.product_description
    }
    const id = {id: req.params.id};
    const result = null;
    const resultOfUpdateProduct = await productController.update(id, product, result);
    if(resultOfUpdateProduct === Error) {
        return res.sendStatus(500).json(Error);
    } else {
        return res.sendStatus(200).send("The product has been updated.");
    };
});

// Удаляем товар
router.delete("/product/:id", async (req, res, next) => {
    if(!req.params.id) return res.sendStatus(400).send("Product ID is not specified.");
    const id = {id: req.params.id};
    const result = null;
    const resultOfDeleteProduct = await productController.delete(id, result);
    if(resultOfDeleteProduct === Error) {
        return res.sendStatus(500).json(Error);
    } else {
        return res.sendStatus(200).send("The product has been deleted.");
    }
});


module.exports = router;