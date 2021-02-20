const Sequelize = require("sequelize");
const db = require("../db.js");
const bodyParser = require("body-parser");

const err = "Error!";

const urlencodedParser = bodyParser.urlencoded({extended: false});

// const sequelize = new Sequelize("database1", "postgres", "123", {
//     dialect: "postgres",
//     host: "localhost",
//     port: "5432",
//     define: {
//         timestamps: false
//     }
// });

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
    const products = Product.findAll({raw: true})
    .then((products) => {      
        return cb(null, products);
    })
    .catch(err => {
        return cb(err, null);
    })
    //const result = products.rows;
    // if(products === null) {
    //     return cb(err, null);
    // } else {
    //     return cb(null, products);
    // };
    // Product.findAll({raw: true}).then(() => {
    //     const result = Product.rows;
    //     console.log(result);
    //     return cb(null, Product);
    // }).catch(err => {
    //     console.log(err);
    //     return cb(err, null);
    // });
};

exports.one = async function getOneProduct(id, cb) {
    //const getOneQuery = 'SELECT * FROM product where id = $1';
    //const getDiscount = 'SELECT * FROM discounts where product_id = $1';
    // const discountFunction = async function getOneDiscount(id) {
    //     const product_id = id;
    //     return product_id;
    // };
    //const curDiscount = await Discount.findOne({where: id});
    const product = await Product.findAll({where: id})
    .then((product) => {
        if(product.id === Discount.product_id) {
            const priceWithDiscount = product.price - (product.price * ((Discount.discount)/100));
            product.price = priceWithDiscount;
            return cb(null, product);
        } else {
            return cb(null, product);
        }
    })
    .catch(err => {
        return cb(err, null);
    });
};

    ////////////////////////////////НЕ ПОДХОДИТ/////////////////////////////////
    // .then(seqProduct => {
    //     Product.create({id: Product.id, product_name: Product.product_name})
    //         .then(seqDiscount => {
    //             discount.create({product_id: id})
    //             .then(svaz => {
    //                 return seqProduct.setDiscount(seqDiscount);
    //                 })
    //                 .catch(err => console.log(err));
    //             })
    //         .catch(err => console.log(err));
    //const discount = await db.query(getDiscount, [id])
    ////////////////////////////////////////////////////////////////////////////

//const priceWithDiscount = product.rows[0].price - (product.rows[0].price * ((discount.rows[0].discount)/100));
//     if (product.rows[0] === null) {
//         return cb(err, null);
//     } else if(discount.rows[0] === null) {
//         const result = product.rows[0];
//         return cb(null, result)
//     } else {
//         product.rows[0].price = priceWithDiscount;
//         const result = product.rows[0];
//         return cb(null, result);
//     };
// };
//})};

exports.create = async function createProduct(product, cb) {
    // const createQuery = 'INSERT INTO product (product_name, price, product_description) values ($1, $2, $3) RETURNING *';
    // const arrayQuery = [product.product_name, product.price, product.product_description];
    // const newProduct = await db.query(createQuery, arrayQuery);
    // const result = newProduct.rows[0];
    // if(newProduct === null) {
    //     return cb(err, null);
    // } else {
    //     return cb(null, result);
    // };
    await Product.create(product)
    .then(() => {
        return cb(null, product)
    })
    .catch(err => {
        console.log(err);
        return cb(err, null);
    })
};

exports.update = async function updateProduct(id, newData, cb) {
    // const updateQuery = 'UPDATE product set product_name = $1, price = $2, product_description = $3 where id = $4 RETURNING *';
    // const arrayQuery = [newData.product_name, newData.price, newData.product_description, id];
    await Product.update(newData, {where: id})
    .then(() => {
        return cb(null, "OK");
    }).catch(err => {
        return cb(err, null);
    })
    // const result = product.rows[0];
    // if(product === null) {
    //     return cb(err, null);
    // } else {
    //     console.log(product)
    //     return cb(null, product);
    // };
};

exports.delete = async function deleteProduct(id, cb) {
    //const deleteQuery = 'DELETE FROM product where id = $1';
    await Product.destroy({where: id})
    .then(() => {
        return cb(null, "OK");
    }).catch(err => {
        return cb(err, null)
    });
    //const result = product.rows[0];
    // if(product === null) {
    //     return cb(err, null);
    // } else {
    //     return cb(null, "result");
    // };
};