const path = require("path");
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/cart", shopController.getCart); // fixed
router.get("/checkout", shopController.getCheckout);

router.post("/delete-product", shopController.postDeleteProduct);

module.exports = router;
