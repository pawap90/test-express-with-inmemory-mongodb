const express = require('express');
const router = express.Router();

const productService = require('../services/product');

/**
 * Test
 */
router.get('/test', async (req, res, next) => {
    return res.json({ message: 'success!' });
});

/**
 * Get product by id.
 */
router.get('/:id', async (req, res, next) => {
    try {
        const product = await productService.getById(req.params.id);
        return res.json(product);
    }
    catch (err) {
        return next(err);
    }
});

/**
 * Create product.
 */
router.post('/', async (req, res, next) => {
    try {
        const product = await productService.create(req.body);
        return res.json(product);
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;