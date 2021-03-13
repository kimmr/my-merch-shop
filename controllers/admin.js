const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imgURL = req.body.imgURL;
  const price = req.body.price;
  const desc = req.body.desc;

  const product = new Product(title, price, desc, imgURL);
  product
    .save()
    .then((result) => {
      console.log("Successfully created ${title}");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

/* exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findByPk(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "[Admin] Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
      });
    })
    .catch((err) => {
      console.log("Error from getEditProduct", err);
    });
}; */

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgURL = req.body.imgURL;
  const updatedDesc = req.body.desc;
  Product.findByPk(prodId)
    .then((product) => {
      (product.title = updatedTitle),
        (product.price = updatedPrice),
        (product.imgURL = updatedImgURL),
        (product.desc = updatedDesc);
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
  Product
    .fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "[Admin] All Products",
        path: "/admin/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Successfully Deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log("Error from postDeleteProduct" + err);
    });
};
