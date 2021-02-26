const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path');

const p = path.join(
    rootDir, 
    'data', 
    'cart.json'
);

module.exports = class cart {
    // Get previous cart
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], 
                         totalPrice: 0};
            if(!err) {
                cart = JSON.parse(fileContent);
            }
            // Find all items in the cart
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new item and update the quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [ ...cart.products, updatedProduct];

            }
            cart.totalPrice = cart.totalPrice + +productPrice; // converting string to number
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
      fs.readFile(p, (err, fileContent) => {
        if(err) {
          return;
        }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      // if there is no product in the cart
      if(!product) {
        return
      }
      
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
      });
    }

    static getCart(cb) {
      fs.readFile(p, (err, fileContent) => {
        const cart = JSON.parse(fileContent);
        if(err){
          cb(null); // if cart is empty, return null
        } else {
          cb(cart);
        }
    });
  }
}