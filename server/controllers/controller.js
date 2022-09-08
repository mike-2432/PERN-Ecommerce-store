// IMPORT MODULES //
const pool = require('../connect-db');


// CONTROLLER //

// get all products
const getAllProducts = async(req, res) => {
    try {
       const allProducts = await pool.query("SELECT * FROM products;");
       res.status(200).json(allProducts.rows)
    } catch (err) {
        console.error(err.message)
    }
};

// get single product
const getProduct = async(req, res) => {
    try {
        const id = req.params.id;
        const product = await pool.query("SELECT * FROM products WHERE product_id = $1;", [id]);
        res.status(200).json(product.rows)
    } catch(err) {
        console.error(err.message)
    }
};

// search products by name
const searchProduct = async(req, res) => {
    try {
        const search = req.params.name;
        const products = await pool.query("SELECT * FROM products WHERE LOWER(name) LIKE LOWER('%' || $1 || '%') ;", [search])
        res.status(200).json(products.rows)
    } catch (err) {
        console.error(err.message)
    }
};

// search products by category
const searchCategory = async(req, res) => {
    try {
        const category = req.params.category;
        const products = await pool.query("SELECT * FROM products WHERE category = $1;", [category])
        res.status(200).json(products.rows)
    } catch(err) {
        console.error(err.message)
    }
};

// get inventory
const getInventory = async(req, res) => {
    try {
        const inventory = await pool.query("SELECT * FROM inventory;");
        res.status(200).json(inventory.rows);
    } catch(err) {
        console.error(err.message);
    }
};

// get single inventory item
const getInventoryItem = async(req, res) => {
    try {
        const id = req.params.id;
        const stock = await pool.query("SELECT * FROM inventory WHERE product_id = $1", [id]);
        res.status(200).json(stock.rows)
    } catch(err) {
        console.error(err.message)
    }
};

// Update the inventory
const updateInventory = async(req, res) => {
    try {
        const {products, amount} = req.body;       

        // Check if there is enough inventory for the order
        for(let i = 0; i < products.length; i++) {
            const currentInventory = await pool.query("SELECT stock FROM inventory WHERE product_id = $1", [products[i]])
            currentStock = currentInventory.rows[0].stock
            if(currentStock < amount[i]) {
                return res.status(400).send("Not enough inventory")
            }
        }

        // Substract the order from the inventory
        for(let i = 0; i < products.length; i++) {
            const updateInventory = await pool.query("UPDATE inventory SET stock = stock - $1 WHERE product_id = $2", [amount[i], products[i]]);
        }        
        res.status(201).send('Inventory modified')
    } catch(err) {
        console.error(err.message)
    } 
};


// Create new order
const submitOrder = async(req, res) => {
    try {
        const {products, total_price, first_name, last_name, dob, phone_number, address, city, email} = req.body.formValues
        const createOrder = await pool.query("INSERT INTO orders (products, total_price, first_name, last_name, dob, phone_number, address, city, email)\
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [products, total_price, first_name, last_name, dob, phone_number, address, city, email]);
        res.status(201).json({ createOrder })
    } catch(err) {
        console.error(err.message)
    }
};


module.exports = {
    getAllProducts,
    getProduct,
    searchProduct,
    searchCategory,
    getInventory,
    getInventoryItem,
    updateInventory,
    submitOrder,
}