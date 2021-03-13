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

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

/* router.post('/delete-product', adminController.postDeleteProduct); */

module.exports = router;
