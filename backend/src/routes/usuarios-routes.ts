import { Router } from 'express';
const router = Router();
import { createUser } from '../controllers/usuarios-controller';

router.route('/')
    .get((req, res) => { res.send('Hello World!') })
    .post(createUser)
    .put()
    .delete();

router.route('/:id')
    // .get(getUsuario);

export default router;