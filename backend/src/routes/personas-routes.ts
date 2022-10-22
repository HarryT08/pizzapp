import { Router } from 'express';
const router = Router();
import { createPersona, findByCedula } from '../controllers/personas-controller';


router.route('/')
    .post(createPersona);

router.route('/:cedula')
    .get(findByCedula);
export default router;