const express = require('express');
const { createProducts, getProducts, updateProducts, deleteProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/products2', createProducts);
router.get('/products2', getProducts);
router.put('/products2/:id', updateProducts);
router.delete('/products2/:id', deleteProducts);
module.exports = router;