const express = require('express');
const productController = require('../controllers/products');
//const rootDir = require('../helpers/path');

const router = express.Router();

const products = [];

// GET method for /admin/add-product
router.get('/add-product', productController.getAddProduct);

// POST method for /admin/add-product
router.post('/add-product', productController.postAddProduct);

module.exports = router;
