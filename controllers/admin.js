const Product = require('../models/product');

// GET Add Product page
exports.getAddProductPage = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
};

// POST Add Product
exports.postAddProduct = (req, res, next) => {
    const { title, description, price, imageUrl } = req.body;

    // Remove $ if user included it and store as number
    const numericPrice = parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;

    // pass null for id when creating a new product
    const product = new Product(null, title, description, numericPrice, imageUrl);
    product.save();
    res.redirect('/admin/products');
};

// GET Edit Product page
exports.getEditProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) return res.redirect('/admin/products');
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            product: product
        });
    });
};

// POST Edit Product
exports.postEditProduct = (req, res, next) => {
    const { id, title, description, price, imageUrl } = req.body;

    // Remove $ if user included it and store as number
    const numericPrice = parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;

    const updatedProduct = new Product(
        id,
        title,
        description,
        numericPrice,
        imageUrl
    );
    updatedProduct.save(); // save() checks if id exists, so it updates
    res.redirect('/admin/products');
};

// GET Admin Products
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products,
            hasProducts: products.length > 0
        });
    });
};

// POST Delete Product
exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.id;
    Product.findById(prodId, product => {
        if (!product) return;
        Product.deleteById(prodId, () => {
            res.redirect('/admin/products');
        });
    });
};
