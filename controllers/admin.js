const Product = require("../models/product");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const desc = req.body.desc;

  const product = new Product({
    title: title,
    price: price,
    desc: desc,
    imgURL: imgURL,
    userId: req.user
  });

  product
    .save()
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Fetch and edit a product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "[Admin] Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log("Error from getEditProduct", err);
    });
};

// Save changes to the database
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgURL = req.body.imgURL;
  const updatedDesc = req.body.desc;

  Product.findById(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.desc = updatedDesc;
    product.imgURL = updatedImgURL;
    return product.save();
  })
  .then((result) => {
    console.log("Updated:", updatedTitle);
    res.redirect("/admin/products");
  })
  .catch((err) => {
    console.log("Error from postEditProduct" + err);
  });
};

// Getting products for the user
exports.getProducts = (req, res, next) => {
  Product.find()
    //.select('title price -_id')
    //.populate('userId', 'name')
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "[Admin] All Products",
        path: "/admin/products",
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then((result) => {
      console.log("Successfully Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Error from postDeleteProduct" + err);
    });
};
