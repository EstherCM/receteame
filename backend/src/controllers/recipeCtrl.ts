const createError = require('http-errors');
import { Request, Response, NextFunction } from 'express';
import { Recipe, IRecipe } from '../database/models/recipeModel';

module.exports.getRecipes = (req: Request, res: Response, next: NextFunction) => {
  Recipe
    .find()
    .then((recipes: IRecipe[]) => {
      res.status(200).json(recipes);
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getRecipes ${error}`);
      next(error);
    })
};

module.exports.getRecipe = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const criterial = {
    _id: id || '',
  };
  
  Recipe
    .find(criterial)
    .then((recipe: IRecipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        next(createError(404, 'The recipe doesn\'t exists'));
      }
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getRecipe ${error}`);
      next(error);
    });
};
