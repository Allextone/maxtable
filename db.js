const Sequelize = require("sequelize");

const sequelize = new Sequelize("database1", "postgres", "123", {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    define: {
        timestamps: false
    }
});

module.exports = sequelize;

