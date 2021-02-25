/*
This is for local storage. Real database will be implemented later
*/
const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path');
const Cart = require('./cart');

const p = path.join(
    rootDir, 
    'data', 
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        // if there is no data, then return empty
        if (err) {
            cb([]);
        } else {
            // storing data
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imgUrl, price, desc) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.desc = desc;
    }

    save() {
        getProductsFromFile(products => {
            // Editing/updating a product
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                // If there is no existing item, create new one with an id
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
      getProductsFromFile(products => {
        const product = products.find(prod => prod.id === id);
        const updatedProducts = products.filter(prod => prod.id !== id); // filter out and return true if id is not equal
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if(!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
    });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};