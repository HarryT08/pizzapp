import { Router } from 'express';
const router = Router();
import { createUser, getUsers, deleteUser, updateUser } from '../controllers/usuarios-controller';
import { auth } from "../middleware/auth";

router.route('/')
    .get(auth, getUsers)
    .post(createUser)
    .put(updateUser);

router.route('/:cedula')
    .delete(deleteUser);

/*
router.route('/login')
    .post(login)
*/

export default router;
