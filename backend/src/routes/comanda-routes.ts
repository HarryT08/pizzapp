import { Router } from 'express';
const router = Router();

import { getComandaByMesa, updateStateComanda } from '../controllers/comanda-controller';

router.route('/:id')
    .get(getComandaByMesa)
    .put(updateStateComanda);

export default router;