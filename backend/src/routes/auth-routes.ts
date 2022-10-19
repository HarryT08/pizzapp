import { Router } from "express";
import { login , signup, pruebaToken } from '../controllers/auth-controller';
import { verifyToken } from '../libs/verifyToken';
const router = Router();


router.route('/')
    .get(login)
    .post(signup)

router.route('/proof')
    .get(verifyToken, pruebaToken)


export default router;