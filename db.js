// const Pool = require("pg").Pool;

// const pool = new Pool({
//     user: "postgres",
//     password: '123',
//     host: "localhost",
//     port: 5432,
//     database: "db_shop"
// });

// module.exports = pool;

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

