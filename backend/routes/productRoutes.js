import express from 'express';
const router = express.Router();

import { all_products, single_product } from '../controllers/productController.js';

router.get('/', all_products); // <--  /api/products
router.get('/:id', single_product); // <-- /api/products/  /api/products/:id

export default router;
// imported in 'server.js' as 'productRoutes'