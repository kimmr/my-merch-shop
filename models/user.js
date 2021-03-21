const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function(product) {
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
      productId: product._id,
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
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
