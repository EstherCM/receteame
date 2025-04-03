import { Request, Response, NextFunction } from 'express';
import RecipeService from '../services/recipeService';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createdRecipe = await RecipeService.create(req.body);

    res.status(201).json(createdRecipe);
  } catch (e) {
    return next(e);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipe = await RecipeService.getById(req.params.id);
    if (recipe?.length === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.status(200).json(recipe);
  } catch (e) {
    return next(e);
  }
};

export const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipes = await RecipeService.getRecipes(req.query);
    const numRecipes = await RecipeService.countRecipes();

    res.status(200).json({ recipes: recipes, total: numRecipes });
  } catch (e) {
    console.error(`🔥 [recipeCtrl] Error getting recipe ${e}`);
    return next(e);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedRecipe = await RecipeService.update(req.params.id, req.body);

    res.status(200).json(updatedRecipe);
  } catch (e) {
    return next(e);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await RecipeService.remove(req.params.id);

    res.status(200).json(result);
  } catch (e) {
    return next(e);
  }
};
