const express = require('express');
const adminController = require('../controllers/admin');
//const rootDir = require('../helpers/path');

const router = express.Router();

const products = [];

// GET method for /admin/add-product
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

// POST method for /admin/add-product
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
