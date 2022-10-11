import { Router } from 'express';
const router = Router();

import { getProducts } from '../controllers/products-controller';

router.route('/')
    .get(getProducts);

export default router;