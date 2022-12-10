import { Router } from 'express';
const router = Router();

import { getMesas, createMesa, deleteMesa } from '../controllers/mesas-controller';

router.route('/')
    .get(getMesas)
    .post(createMesa)
    .put()
    .delete(deleteMesa);

router.route('/:id')
    .delete(deleteMesa);

export default router;