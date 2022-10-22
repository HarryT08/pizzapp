import { Router } from 'express';
const router = Router();
import { createUser, getUsers } from '../controllers/usuarios-controller';

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put()
    .delete();

/*
router.route('/login')
    .post(login)
*/

export default router;