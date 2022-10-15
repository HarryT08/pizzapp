import { Router } from 'express';
const router = Router();

import { getProducts } from '../controllers/products-controller';

// TODO: Create object router

router.route('/')
    .get(getProducts);

export default router;