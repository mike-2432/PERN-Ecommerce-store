// IMPORT MODULES //
const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProduct,
    searchProduct,
    searchCategory,
    getInventory,
    getInventoryItem,
    updateInventory,
    submitOrder,
} = require('../controllers/controller')


// ROUTES //
router.route('/products').get(getAllProducts); // All products
router.route('/product/:id').get(getProduct); // Single product    
router.route('/products/:name').get(searchProduct); // Product search by name
router.route('/products/category/:category').get(searchCategory); // Product search by category

router.route('/inventory').get(getInventory).put(updateInventory); // Get and update inventory
router.route('/inventory/:id').get(getInventoryItem); // Get single inventory item

router.route('/submit').post(submitOrder); // Check for inventory conflict and post the order


// EXPORTS //
module.exports = router