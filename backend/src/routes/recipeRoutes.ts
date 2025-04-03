import express from 'express';
import { create, getById, getRecipes, update, remove } from '../controllers/recipeCtrl';
import { validCreateRecipeEvent, dataSecurity } from '../middlewares/recipeMiddleware';

const recipesRoutes = express.Router();

recipesRoutes.post('/recipes', validCreateRecipeEvent, create);

recipesRoutes.get('/recipes', getRecipes);

recipesRoutes.get('/recipes/:id', getById);

recipesRoutes.put('/recipes/:id', dataSecurity, update);

recipesRoutes.delete('/recipes/:id', dataSecurity, remove);

export default recipesRoutes;
