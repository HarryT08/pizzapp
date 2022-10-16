import { Router } from 'express';
const router = Router();

// import { getMesas } from '../controllers/mesas-controller';

router.route('/')
    // .get(getMesas)
    .post()
    .put()
    .delete();

export default router;