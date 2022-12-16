import { Router } from 'express';
const router = Router();

import { getComandaByMesa, updateStateComanda, getComandas, getLastComandas, crearComanda} from '../controllers/comanda-controller';

router.route("/")
    .get(getComandas)
    .post(crearComanda)

router.route("/getLastComandas")
    .get(getLastComandas);

router.route('/:id')
    .get(getComandaByMesa)
    .put(updateStateComanda);

export default router;