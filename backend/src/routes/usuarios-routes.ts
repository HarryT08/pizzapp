import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getUserByPhone } from '../controllers/usuarios-controller';

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put()
    .delete();

router.route('/:username')
    .get(getUserByPhone);

export default router;