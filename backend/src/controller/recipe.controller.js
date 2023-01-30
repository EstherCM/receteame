"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require('http-errors');
const { Recipe } = require('../model');
module.exports.getRecipes = (req, res, next) => {
    Recipe
        .find()
        .then((recipes) => {
        res.status(200).json(recipes);
    })
        .catch((error) => {
        console.error(error);
        next();
    });
};
module.exports.getRecipe = (req, res, next) => {
    const { id } = req.params;
    const criterial = {
        _id: id || ""
    };
    Recipe
        .find(criterial)
        .then((recipe) => {
        if (recipe.length) {
            res.status(200).json(recipe);
        }
        else {
            next(createError(404, "The recipe doesn't exists"));
        }
    })
        .catch((error) => {
        console.error(error);
        next();
    });
};
