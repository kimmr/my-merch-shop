const mongodb = require("mongodb");
const getDb = require("../helpers/database").getDb;

class Product {
  constructor(title, price, desc, imgURL) {
    this.title = title;
    this.price = price;
    this.desc = desc;
    this.imgURL = imgURL;
  }

  // Save data
  save() {
    const db = getDb();

    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log("Error from save() product", err);
      });
  }

  // Get all products from database
  static fetchAll() {
    const db = getDb();

    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log("Error from fetchAll() product", err);
      });
  }

  static findById(prodId) {
    const db = getDb();

    return db
      .collection("products")
      .find({
        _id: mongodb.ObjectId(prodId),
      })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log("Error from fetchAll() product", err);
      });
  }
}

module.exports = Product;
