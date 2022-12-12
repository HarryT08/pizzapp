import { Router } from 'express';
const router = Router();

import { getProduct, createProduct, getProducts, deleteProduct, updateProduct,
 getProductsAndPreparations } from '../controllers/products-controller';

router.route('/')
    .get(getProducts)
    .post(createProduct)

router.route('/productsAndPreparations')
    .get(getProductsAndPreparations);

router.route('/:id')
    .get(getProduct)
    .delete(deleteProduct)
    .put(updateProduct)

export default router;