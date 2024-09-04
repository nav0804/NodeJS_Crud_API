const Pool = require('pg').Pool

const pool = new Pool({
    host:"localhost",
    user:"postgres",
    database:"students",
    password:"root",
    port:5432
})

module.exports = pool;