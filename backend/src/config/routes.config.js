"use strict";
const express = require('express');
const router = express.Router();
const { recipe } = require('../controller');
router.get('/recipe', recipe.getRecipes);
router.get('/recipe/:id', recipe.getRecipe);
module.exports = router;
