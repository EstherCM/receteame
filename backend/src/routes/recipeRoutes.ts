import express from 'express';
const router = express.Router();

import { create, getById, getRecipes, update, remove } from '../controllers/recipeCtrl';
import { validCreateRecipeEvent, dataSecurity } from '../middlewares/recipeMiddleware';

router.post('/recipes', validCreateRecipeEvent, dataSecurity, create);

router.get('/recipes', getRecipes);

router.get('/recipes/:id', getById);

router.put('/recipes/:id', dataSecurity, update);

router.delete('/recipes/:id', dataSecurity, remove);

module.exports = router;