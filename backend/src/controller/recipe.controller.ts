const createError = require('http-errors');
const { Recipe } = require('../model');

module.exports.getRecipes = (req: any, res: any, next: any) => {
  Recipe
    .find()
    .then((recipes: any) => {
      res.status(200).json(recipes);
    })
    .catch((error: Error) => {
      console.error(error);
      next();
    })
};

module.exports.getRecipe = (req: any, res: any, next: any) => {
  const { id } = req.params;

  const criterial = {
    _id: id || ""
  };
  
  Recipe
    .find(criterial)
    .then((recipe: any) => {
      if (recipe.length) {
        res.status(200).json(recipe);
      } else {
        next(createError(404, "The recipe doesn't exists"));
      }
    })
    .catch((error: Error) => {
      console.error(error);
      next();
    })
};

export {};