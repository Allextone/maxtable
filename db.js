const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: '123',
    host: "localhost",
    port: 5432,
    database: "db_shop"
});



module.exports = pool;