import { Router } from 'express';
const router = Router();

import { getProduct, createProduct, getProducts, deleteProduct } from '../controllers/products-controller';

router.route('/')
    .get(getProducts)
    .post(createProduct)
    .put()

router.route('/:id')
    .get(getProduct)
    .delete(deleteProduct);
export default router;