import { Router } from 'express';
const router = Router();

import { getUsuarios, getUsuario } from '../controllers/usuarios-controller';

router.route('/')
    .get(getUsuarios)
    .post()
    .put()
    .delete();

router.route('/:id')
    .get(getUsuario);

export default router;