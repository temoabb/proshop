import express from 'express';
const router = express.Router();

import * as productControllers from '../controllers/productController.js';

router.get('/', productControllers.all_products); // <--  /api/products/
router.get('/:id', productControllers.single_product); // <--  /api/products/:id

export default router; // imported in 'server.js' as 'productRoutes'