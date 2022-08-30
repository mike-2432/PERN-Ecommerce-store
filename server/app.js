// IMPORT MODULES //
const express = require('express');
const cors = require('cors');
const pool = require('./connect-db');
require('dotenv').config();


// APP //
const app =  express();


// MIDDLEWARE //
app.use(cors());
app.use(express.json());


// ROUTES //
// get all products
app.get('/api/v1/products', async(req, res) => {
    try {
       const allProducts = await pool.query("SELECT * FROM products;");
       res.json(allProducts.rows)
    } catch (err) {
        console.error(err.message)
    }
});

// search products
app.get('/api/v1/products/:name', async(req, res) => {
    try {
        const search = req.params.name;
        const products = await pool.query("SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%' || $1 || '%') ;", [search])
        res.json(products.rows)
    } catch (err) {
        console.error(err.message)
    }
});

// search category
app.get('/api/v1/products/category/:category', async(req, res) => {
    try {
        const category = req.params.category;
        const products = await pool.query("SELECT * FROM products WHERE category = $1", [category])
        res.json(products.rows)
    } catch(err) {
        console.error(err.message)
    }
})

// get single product
app.get('/api/v1/product/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);
        res.json(product.rows)
    } catch(err) {
        console.error(err.message)
    }
})


// PORT //
const port = process.env.PORT || 3001;


// LISTENER //
const server = app.listen(port, () => console.log(`Listening to port ${port}`));