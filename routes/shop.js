const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const adminData = require('./admin'); // expects admin.js to export the products array (e.g. module.exports.products = products;)

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('shop', {
    pageTitle: 'Shop',
    path: '/',
    prods: adminData.products,          // <-- pass products to template
    hasProducts: adminData.products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;