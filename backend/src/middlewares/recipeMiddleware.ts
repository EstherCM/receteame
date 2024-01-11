import { Request, Response, NextFunction } from 'express';
const createError = require('http-errors');
const recipeDAO = require('../database/daos/recipeDAO');

export const validCreateRecipeEvent = (req: Request, res: Response, next: NextFunction) => {
  const { body: { name, ingredients, preparation } } = req;

  if (!name || !ingredients || !preparation) {
    return next(createError(400, 'Bad Request: Some properties are missing'));
  }

  next();
};

export const dataSecurity = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { id: userId }, params: { id: recipeId } } = req;

  try {
    const [foundRecipe] = await recipeDAO.getBy({ _id: recipeId });

    if (!foundRecipe) {
      console.error('🤷 Recipe not found', recipeId);
      return next(createError(404));
    }

    if (foundRecipe.createdBy != userId) {
      console.error('❌ Recipe owns another user');
      return next(createError(401));
    }
    return next();
  } catch(e) {
    console.error(`🔥 Error finding recipe by id ${e}`);
    return next(e);
  }
};
