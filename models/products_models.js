const db = require("../db.js");
const err = "Error!";

exports.all = async function getProducts(cb) {
    const products = await db.query('SELECT * FROM product');
    const result = products.rows;
    if(products === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.one = async function getOneProduct(id, cb) {
    const getOneQuery = 'SELECT * FROM product where id = $1';
    const getDiscount = 'SELECT * FROM discount where product_id = $1';
    const product = await db.query(getOneQuery, [id]);
    const discount = await db.query(getDiscount, [id]);
    const priceWithDiscount = product.rows[0].price - (product.rows[0].price * ((discount.rows[0].discount)/100));
    if (product.rows[0] === null) {
        return cb(err, null);
    } else if(discount.rows[0] === null) {
        const result = product.rows[0];
        return cb(null, result)
    } else {
        product.rows[0].price = priceWithDiscount;
        const result = product.rows[0];
        return cb(null, result);
    };
};

exports.create = async function createProduct(product, cb) {
    const createQuery = 'INSERT INTO product (product_name, price, product_description) values ($1, $2, $3) RETURNING *';
    const arrayQuery = [product.product_name, product.price, product.product_description];
    const newProduct = await db.query(createQuery, arrayQuery);
    const result = newProduct.rows[0];
    if(newProduct === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.update = async function updateProduct(id, newData, cb) {
    const updateQuery = 'UPDATE product set product_name = $1, price = $2, product_description = $3 where id = $4 RETURNING *';
    const arrayQuery = [newData.product_name, newData.price, newData.product_description, id];
    const product = await db.query(updateQuery, arrayQuery);
    const result = product.rows[0];
    if(product === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.delete = async function deleteProduct(id, cb) {
    const deleteQuery = 'DELETE FROM product where id = $1';
    const product = await db.query(deleteQuery, [id]);
    const result = product.rows[0];
    if(product === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};
