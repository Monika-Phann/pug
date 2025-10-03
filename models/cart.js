// models/cart.js
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '..', 'data', 'cart.json');

const readCart = cb => {
  fs.readFile(p, 'utf8', (err, data) => {
    if (err) return cb({ products: [], totalPrice: 0 });
    try {
      cb(JSON.parse(data));
    } catch (e) {
      cb({ products: [], totalPrice: 0 });
    }
  });
};

const writeCart = (cart, cb) => {
  fs.writeFile(p, JSON.stringify(cart, null, 2), 'utf8', err => {
    if (err) console.error('Failed to write cart.json:', err);
    if (cb) cb(err);
  });
};

module.exports = class Cart {
  // productPrice should be numeric (controller should pass product.price)
  static addProduct(id, productPrice, cb) {
    readCart(cart => {
      const idx = cart.products.findIndex(it => it.id === id);
      if (idx >= 0) {
        cart.products[idx].qty += 1;
      } else {
        cart.products.push({ id, qty: 1, price: Number(productPrice) || 0 });
      }
      // recalc from stored prices
      cart.totalPrice = cart.products.reduce((s, it) => s + (it.qty * (it.price || 0)), 0);
      writeCart(cart, () => {
        if (cb) cb();
      });
    });
  }

  static deleteProduct(id, cb = () => {}) { // default empty function
  readCart(cart => {
    const product = cart.products.find(it => it.id === id);
    if (!product) {
      return cb(); // now safe even if cb is undefined
    }
    cart.products = cart.products.filter(it => it.id !== id);
    cart.totalPrice = cart.products.reduce((s, it) => s + (it.qty * (it.price || 0)), 0);
    writeCart(cart, () => cb());
  });
}

  static getCart(cb) {
    readCart(cb);
  }
};
