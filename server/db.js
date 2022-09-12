require('dotenv').config()
const Pool = require('pg').Pool;

// Development configuration
const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

// Production configuration
const productionConfig = process.env.DATABASE_URL

// Connection pool
const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? productionConfig : devConfig,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = pool;