const productModels = require("../models/products_models");

exports.all = async function getAllProducts() {
    const result = await productModels.all(function(err, docs) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return docs;
        };
    });
    return result;
};

exports.one = async function getOneProduct(id, cb) {
    const result = await productModels.one(id, function(err, doc) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return doc; 
        }
    });
    cb = result;
    return cb;
};

exports.create = async function createProduct(product, cb) {
    const confirmationOfCreate = await productModels.create(product, function(err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return result;
        }
    });
    cb = confirmationOfCreate;
    return cb;
};

exports.update = async function updateProduct(id, product, cb) {
    const confirmationOfUpdate = await productModels.update(id, product, function(err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return result;
        }
    });
    cb = confirmationOfUpdate;
    return cb;
};

exports.delete = async function deleteProduct(id, cb) {
    const confirmationOfDelete = await productModels.delete(id, function(err, result) {
        if (err) {
            console.log(err);
            return err;
        } else {
            return result;
        }
    });
    cb = confirmationOfDelete;
    return cb;
};