import { Router } from 'express';
const router = Router();

import { getMesas, createMesa, deleteMesa, getMesasByEstado, updateStateMesa } from '../controllers/mesas-controller';

router.route('/')
    .get(getMesas)
    .post(createMesa)
    .delete(deleteMesa);

router.route('/:id')
    .put(updateStateMesa)
    .delete(deleteMesa);

router.route('/:estado')
    .get(getMesasByEstado);

export default router;