import { Router } from 'express';
const router = Router();

import { getComandaByMesa, updateStateComanda, getComandas, getLastComandas } from '../controllers/comanda-controller';

router.route("/")
    .get(getComandas);

router.route("/getLastComandas")
    .get(getLastComandas);

router.route('/:id')
    .get(getComandaByMesa)
    .put(updateStateComanda);

export default router;