/*
This is for local storage. Real database will be implemented later
*/
const fs = require('fs');
const path = require('path');
const rootDir = require('../helpers/path');

const p = path.join(
    rootDir, 
    'data', 
    'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        // if there is no data, then return empty
        if (err) {
            callback([]);
        } else {
            // storing data
            callback(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, imgUrl, price, desc) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.desc = desc;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
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