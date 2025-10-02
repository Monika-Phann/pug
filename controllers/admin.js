const Product = require('../models/product');

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    productCSS: true,
    activeAddproduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, description, price, imageUrl } = req.body;
  const product = new Product(title, description, price, imageUrl);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products || [], // ensures it's always an array
      hasProducts: products && products.length > 0 // <-- important
    });
  });
};

exports.getEditProductPage = (req, res, next) => {
  const prodId = req.query.id;
  Product.fetchAll(products => {
    const product = products.find(p => p.id === prodId);
    if (!product) return res.redirect('/admin/products');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product
    });
  });
};

