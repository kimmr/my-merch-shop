const mongodb = require("mongodb");
const getDb = require("../helpers/database").getDb;

const ObjectId = mongodb.ObjectId;

class Product {
  constructor(title, price, desc, imgURL, _id, userId) {
    this.title = title;
    this.price = price;
    this.desc = desc;
    this.imgURL = imgURL;
    // Create ObjectId if there is no such id, and return null
    // Pass existing ObjectId if there is one
    this._id = _id ? new mongodb.ObjectId(_id) : null;
    this.userId = userId;
  }

  // Save data
  save() {
    const db = getDb();
    let dbOp;
    // Update existing product
    if(this._id) {
      dbOp = db
      .collection("products")
      .updateOne({_id: this._id}, { $set: this});
      // .updateOne({_id: new mongodb.ObjectId(this._id)}, { $set: {this.title = title, this.price = price ...}});
    } else {
      // if there is no existing product, insert a new data
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
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
        _id: mongodb.ObjectId(prodId)
      })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log("Error from findById() product", err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({_id: mongodb.ObjectId(prodId)
      })
      .then(result => {
        console.log('Deleted Successfully');
      })
      .catch((err) => {
        console.log("Error from fetchAll() product", err);
      });
  }
}

module.exports = Product;
