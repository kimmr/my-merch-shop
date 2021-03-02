/* SQL Server */
const db = require('../helpers/database');

const Cart = require('./cart');

module.exports = class Product {
    constructor(id, title, imgUrl, price, desc) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.price = price;
        this.desc = desc;
    }

    save() {
      return db.execute(
        'INSERT INTO products (title, price, imgURL, details) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imgUrl, this.desc]
      );
    }

    static deleteById(id) {
     
    }

    static fetchAll() {
      return db.execute('SELECT * FROM products');
    }

    static findById(id) {
      return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    }
};