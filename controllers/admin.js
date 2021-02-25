const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imgURL = req.body.imgURL;
    const price = req.body.price;
    const desc = req.body.desc;
    const product = new Product(title, imgURL, price, desc);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
        prods: products,
        pageTitle: "Admin(products)",
        path: '/admin/products'
      });
  });
}