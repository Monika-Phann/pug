const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');


//router.get('/edit-product', adminController.getEditProductPage);
//router.post('/edit-product', adminController.postEditProduct); // implement save logic


// /admin/add-product => GET
router.get("/add-product", adminController.getAddProductPage);

// /admin/products => GET
router.get("/products",adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

module.exports = router;
