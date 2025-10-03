const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'products.json');

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, description, price, imageUrl) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        // edit existing product
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        products[existingProductIndex] = this;
      } else {
        this.id = Date.now().toString();
        products.push(this);
      }
      // ✅ use pretty-print here
      fs.writeFile(p, JSON.stringify(products, null, 2), err => {
        if (err) console.log(err);
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

  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(p => p.id !== id);
      // already pretty-print here ✅
      fs.writeFile(p, JSON.stringify(updatedProducts, null, 2), err => {
        if (err) console.log(err);
        cb();
      });
    });
  }
};
