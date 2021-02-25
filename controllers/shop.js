const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('shop/product-list', {
      prods: products,
      pageTitle: "Megan's merch",
      path: '/'
    });
});
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId; // send in the request url parameter
  Product.findById(productId, product => {
    res.render('shop/product-detail', {
      product : product,
      pageTitle: product.title,
      path: '/products'
    });
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
    prods: products,
    pageTitle: "Megan's merch",
    path: '/'
  });
});  
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: "Shopping Cart",
    path: '/cart'
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: "Order",
    path: '/orders'
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout'
  });
}