const Sequelize = require("sequelize");
const db = require("../db.js");

const err = "Error!";

const Product = db.define("products", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_description: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Discount = db.define("discounts", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    product_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    start_discount: {
        type: Sequelize.DATE,
        allowNull: false
    },
    end_discount: {
        type: Sequelize.DATE,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

exports.all = async function getProducts(cb) {
    //const products = await db.query('SELECT * FROM products');
    const products = await Product.findAll({raw: true});
    if(products === null) {
        return cb(err, null);
    } else {
        return cb(null, products);
    };
};

exports.one = async function getOneProduct(id, cb) {
    //const getOneQuery = 'SELECT * FROM product where id = $1';
    //const getDiscount = 'SELECT * FROM discounts where product_id = $1';
    //const curDiscount = await Discount.findOne({where: id});
    const product = await Product.findAll({where: {id: id}});
    const productDiscount = await Discount.findAll({where: {product_id: id}});
    const priceWithDiscount = product.price - (product.price * ((productDiscount.discount)/100));
    if (product === null) {
        return cb(err, null);
    } else if(productDiscount === null) {
        return cb(null, product)
    } else {
        product.price = priceWithDiscount;
        const result = product;
        return cb(null, result);
    };
};

exports.create = async function createProduct(product, cb) {
    // const createQuery = 'INSERT INTO product (product_name, price, product_description) values ($1, $2, $3) RETURNING *';
    // const arrayQuery = [product.product_name, product.price, product.product_description];
    // const newProduct = await db.query(createQuery, arrayQuery);    
    const newProduct = await Product.create(product);
    if(newProduct === null) {
        return cb(err, null);
    } else {
        return cb(null, newProduct);
    };
};

exports.update = async function updateProduct(id, newData, cb) {
    // const updateQuery = 'UPDATE product set product_name = $1, price = $2, product_description = $3 where id = $4 RETURNING *';
    // const arrayQuery = [newData.product_name, newData.price, newData.product_description, id];
    const product = await Product.update(newData, {where: id});
    if(product === null) {
        return cb(err, null);
    } else {
        return cb(null, product);
    };
};

exports.delete = async function deleteProduct(id, cb) {
    //const deleteQuery = 'DELETE FROM product where id = $1';
    const product = await Product.destroy({where: id});
    if(product === null) {
        return cb(err, null);
    } else {
        return cb(null, product);
    };
};