const Product = require('../models/product')


exports.getAddProductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    activeAddproduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  products.push({
    title: req.body.title,
    description: req.body.description || "No description provided.",
    price: req.body.price || "$599",
    imageUrl: req.body.imageUrl || "https://www.apple.com/newsroom/images/product/watch/lifestyle/Apple-Watch-SE-aluminum-silver-220907_inline.jpg.large.jpg",
  });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
   Product.fetchAll((products) => {

  });
  res.render("shop", {
    pageTitle: "Shop",
    path: "/",
    prods: products,
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
