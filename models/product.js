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
    constructor(title) {
        this.title = title;
    }

    save() {
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
};