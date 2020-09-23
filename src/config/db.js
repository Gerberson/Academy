const { Pool } = require('pg')

module.exports = new Pool({
    user: "pglptrbegrwsfu",
    password: "e4ea8fa7d5e68e99875080c96ac371a859d090618d4f4283eff7dabe939e6b57",
    host: "ec2-52-73-199-211.compute-1.amazonaws.com",
    port: 5432,
    database: "d948931onk50a8"
})