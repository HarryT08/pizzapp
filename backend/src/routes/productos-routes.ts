import { Router } from 'express';
const router = Router();

import { getProduct, createProduct } from '../controllers/products-controller';

router.route('/')
    // .get(getProducts)
    .post(createProduct)
    .put()
    .delete();

router.route('/:id')
    .get(getProduct)

export default router;