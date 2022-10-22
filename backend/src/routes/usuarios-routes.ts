import { Router } from 'express';
const router = Router();
import { createUser, getUsers, deleteUser } from '../controllers/usuarios-controller';

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put();

router.route('/:cedula')
    .delete(deleteUser);

/*
router.route('/login')
    .post(login)
*/

export default router;