const db = require("../db");
const discountModels = require("../models/discounts_models");

exports.all = function(req, res) {
    discountModels.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        };
        res.json(docs);
    })
};

exports.one = function(req, res) {
    discountModels.one(req.params.id, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(doc);
    });
};

exports.create = function(req, res) {
    const discount = {
        product_name: req.body.product_name,
        discount: req.body.discount,
        start_discount: req.body.start_discount,
        end_discount: req.body.end_discount,
        product_id: req.body.product_id
    }
    discountModels.create(discount, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(discount);
    });
};

exports.update = function(req, res) {
    const discount = {
        product_name: req.body.product_name,
        discount: req.body.discount,
        start_discount: req.body.start_discount,
        end_discount: req.body.end_discount,
        product_id: req.body.product_id
    }
    discountModels.update(req.params.id, discount, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(result);
    });
};

exports.delete = function(req, res) {
    const id = req.params.id;
    discountModels.delete(id, function(err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.json(result);
    })
};

// class DiscountController {
//     async createDiscount(req, res) {
//         const {product_name, discount, start_discount, end_discount, product_id} = req.body;
//         const newDiscount = await db.query('INSERT INTO discount (product_name, discount, start_discount, end_discount, product_id) values ($1, $2, $3, $4, $5) RETURNING *',
//         [product_name, discount, start_discount, end_discount, product_id]);
//         console.log(newDiscount.rows[0]);
//         res.sendStatus(200).json(newDiscount.rows[0]);
//     }

//     async getDiscounts(req, res) {
//         const discounts = await db.query("SELECT * FROM discount");
//         res.sendStatus(200).json(discounts.rows);

//     }

//     async getDiscountForProduct(req, res) {
//         const id = req.query.id;
//         const discount = await db.query("SELECT * FROM discount where product_id = $1", [id]);
//         res.sendStatus(200).json(discount.rows[0]);
//     }

//     async updateDiscount(req, res) {
//         const {id, product_name, discount, start_discount, end_discount, product_id} = req.body;
//         const currentDiscount = await db.query('UPDATE discount set product_name = $1, discount = $2, start_discount = $3, end_discount = $4 where product_id = $5 RETURNING *',
//         [product_name, discount, start_discount, end_discount, product_id]);
//         res.sendStatus(200).json(currentDiscount.rows[0]);
//     }

//     async deleteDiscount(req, res) {
//         const id = req.query.id;
//         const discount = await db.query("SELECT * FROM discount where product_id = $1", [id]);
//         res.sendStatus(200).json(discount.rows[0]);
//     }
// }

// module.exports = new DiscountController();