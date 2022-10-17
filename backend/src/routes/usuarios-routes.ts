import { Router } from 'express';
const router = Router();
import { createUser, getUsers, getUserByPhone, login } from '../controllers/usuarios-controller';

router.route('/')
    .get(getUsers)
    .post(createUser)
    .put()
    .delete();

router.route('/:username')
    .get(getUserByPhone)

router.route('/login')
    .post(login)
    
export default router;