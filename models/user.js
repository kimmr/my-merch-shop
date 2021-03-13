const mongodb = require('mongodb');
const getDb = require('../helpers/database').getDb;

const ObjectId = mongodb.ObjectId;

class User {
  constructor(username, email, cart, _id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }
  
  save() {
    const db = getDb();
    
    return db.collection('users')
    .insertOne(this)
    .then(result => {
      console.log(result);
      console.log('Succesfully created an user ${name}');
    })
    .catch((err) => {
      console.log("Error from save() user", err);
    });
  }

  addToCart(product) {
    // Get matching product
    
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      // Add 1 to the quantity
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      // Update quantity
      // if there is no such product existed in the cart already, return 1
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } 
    else {
      // New cart item
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        title: product.title,
        quantity: newQuantity
      });
      // Storing all info about product in the cart
      // const updatedCart = { items: [{ ...product, quantity: 1}] };
    }

    // All items in the cart
    const updatedCart = { 
      items: updatedCartItems
    };

    const db = getDb();

    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart }}
      );
  }

  static findById(userId) {
    const db = getDb();
    
    return db.collection('users')
    .findOne({_id: new ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch((err) => {
      console.log("Error from findById() user", err);
    });
  }
}

module.exports = User;
