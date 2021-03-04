const Sequelize = require("sequelize");
const db = require("../db.js");
const err = "Error!";

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

exports.all = async function getDiscount(cb) {
    //const discounts = await db.query('SELECT * FROM discount');
    const discounts = Discount.findAll({raw: true});
    const result = discounts.rows;
    if(discounts === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.one = async function getOneDiscount(id, cb) {
    // const getOneQuery = 'SELECT * FROM discount where product_id = $1';
    // const discount = await db.query(getOneQuery, [id]);
    const discount = await Discount.findAll({where: id});
    const result = discount.rows[0];
    if (discount.rows[0] === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.create = async function createDiscount(discount, cb) {
    // const createQuery = 'INSERT INTO discount (product_name, discount, start_discount, end_discount, product_id) values ($1, $2, $3, $4, $5) RETURNING *';
    // const arrayQuery = [discount.product_name, discount.discount, discount.start_discount, discount.end_discount, discount.product_id];
    // const newDiscount = await db.query(createQuery, arrayQuery);
    const newDiscount = await Discount.create(discount);
    const result = newDiscount.rows[0];
    if(newDiscount === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.update = async function updateDiscount(id, newData, cb) {
    // const updateQuery = 'UPDATE discount set product_name = $1, discount = $2, start_discount = $3, end_discount = $4 where product_id = $5 RETURNING *';
    // const arrayQuery = [newData.product_name, newData.discount, newData.start_discount, newData.end_discount, newData.product_id];
    // const discount = await db.query(updateQuery, arrayQuery);
    const discount = await Discount.update(newData, {where: id})
    const result = discount.rows[0];
    if(discount === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};

exports.delete = async function deleteDiscount(id, cb) {
    // const deleteQuery = 'DELETE FROM discount where id = $1';
    // const discount = await db.query(deleteQuery, [id]);
    const discount = await Discount.destroy({where: id});
    const result = discount.rows[0];
    if(discount === null) {
        return cb(err, null);
    } else {
        return cb(null, result);
    };
};