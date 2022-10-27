import Router from "express";
const router = Router();
import {
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredients
} from "../controllers/ingredientes-controller";

router.route('/')
    .get(getIngredients)
    .post(createIngredient)
    .put(updateIngredient)
    .delete(deleteIngredient);

export default router;