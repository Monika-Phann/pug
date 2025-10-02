const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const p = path.join(__dirname, '..', 'data', 'products.json');

// Helper to read products from file
const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      // If file doesn't exist or error, return empty array
      return cb([]);
    }
    try {
      cb(JSON.parse(fileContent));
    } catch (parseErr) {
      console.log('Error parsing products.json:', parseErr);
      cb([]);
    }
  });
};

module.exports = class Product {
  constructor(title, description, price, imageUrl, id) {
    this.id = id || uuidv4();
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
  }

  // Save new product
  save(cb) {
    getProductsFromFile(products => {
      // If this.id exists, update existing product
      const existingIndex = products.findIndex(p => p.id === this.id);
      if (existingIndex >= 0) {
        products[existingIndex] = this;
      } else {
        products.push(this);
      }

      fs.writeFile(p, JSON.stringify(products, null, 2), err => {
        if (err) console.log('Error writing file:', err);
        if (cb) cb(err);
      });
    });
  }

  // Fetch all products
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  // Delete product by ID
  static deleteById(id, cb) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts, null, 2), err => {
        if (err) console.log('Error writing file:', err);
        if (cb) cb(err);
      });
    });
  }
};
