const express = require('express');
const path = require('path');

const rootDir = require('../util/path'); 

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product', productCSS: true, activeAddproduct: true});
});

router.post('/add-product', (req, res, next) => {
  products.push({
    title: req.body.title,
    price: req.body.price || '$599',      // add price field
    imageUrl: req.body.imageUrl || 'https://www.apple.com/newsroom/images/product/watch/lifestyle/Apple-Watch-SE-aluminum-silver-220907_inline.jpg.large.jpg'
  });
  res.redirect('/');
});


exports.routes = router;
exports.products = products; 