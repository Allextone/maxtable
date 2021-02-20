const Sequelize = require('sequelize');
let Model = Sequelize.Model;

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {}
    Product.init({
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
    }, {
      sequelize,
      modelName: 'products'
    });
    return Product;
};
