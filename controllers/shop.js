const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      pageTitle: 'All Products',
      path: '/products',
      prods: products,
      hasProducts: products.length > 0
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      pageTitle: 'Shop',
      path: '/',
      prods: products,
      hasProducts: products.length > 0
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = cart.products
        .map(prod => {
          const productData = products.find(p => p.id === prod.id);
          if (!productData) return null; // skip if product no longer exists
          return { qty: prod.qty, productData };
        })
        .filter(item => item !== null); // remove nulls

      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products: cartProducts,
        totalPrice: cart.totalPrice
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    // convert price string like "5$" -> number
    let numericPrice = 0;
    if (product.price) {
      numericPrice = parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 0;
    }
    Cart.addProduct(prodId, numericPrice, () => {
      res.redirect('/cart');
    });
  });
};

exports.postCartDelete = (req, res, next) => {
  const prodId = req.body.id;
  Cart.deleteProduct(prodId, () => {
    res.redirect('/cart');
  });
};



exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { pageTitle: 'Your Orders', path: '/orders' });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
};

