const productModels = require("../models/products_models");

exports.all = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    productModels.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
        res.json(docs);
    })
};

exports.one = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const id = {id: req.params.id};
    productModels.one(id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(doc);
    });
};

exports.create = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_description: req.body.product_description
    };
    productModels.create(product, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.update = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        product_description: req.body.product_description
    }
    const id = {id: req.params.id};
    productModels.update(id, product, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.sendStatus(200);
    });
};

exports.delete = function(req, res) {
    if(!req.body) return res.sendStatus(400);
    const id = {id: req.params.id};
    productModels.delete(id, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(result);
    })
};




// class ProductController {
//     async createProduct(req, res) {
//         const {product_name, price, product_description} = req.body;
//         const newProduct = await db.query('INSERT INTO product (product_name, price, product_description) values ($1, $2, $3) RETURNING *', [product_name, price, product_description])
        
//         res.sendStatus(200).json(newProduct.rows[0]); 
//     }

//     async getProducts(req, res) {
//         // const products = await db.query('SELECT * FROM product');
//         // res.json(products.rows);
//     }

//     async getOneProduct(req, res) {
//         // const id = req.params.id;
//         // const product = await db.query('SELECT * FROM product where id = $1', [id]);
//         // const discount = await db.query('SELECT * FROM discount where product_id = $1', [id]);
//         // if (!discount.rows[0]) {
//         //     res.sendStatus(404).json(product.rows[0]);
//         // } else {
//         //     let a = product.rows[0].price - (product.rows[0].price * ((discount.rows[0].discount)/100));
//         //     console.log(a);
//         //     res.json(a).sendStatus(200);
//         // }
//     }

//     async updateProduct(req, res) {
//         // const {id, product_name, price, product_description} = req.body;
//         // const product = await db.query('UPDATE product set product_name = $1, price = $2, product_description = $3 where id = $4 RETURNING *', [product_name, price, product_description, id]);
//         // res.sendStatus(200).json(product.rows[0]);
//     }

//     async deleteProduct(req, res) {
//         // const id = req.params.id;
//         // const product = await db.query('DELETE FROM product where id = $1', [id]);
//         // res.sendStatus(200).json(product.rows[0]);
//     }
// }

// module.exports = new ProductController();