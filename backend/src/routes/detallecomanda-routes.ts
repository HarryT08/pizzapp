import { Router } from 'express';
const router = Router();

import { getDetalles} from '../controllers/detallecomanda-controller';

router.route('/:idComanda')
    .get(getDetalles);

export default router;