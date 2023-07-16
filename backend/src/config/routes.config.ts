const express = require('express');
const router = express.Router();
const { recipeCtrl, userCtrl } = require('../controller');

router.get('/recipes', recipeCtrl.getRecipes);
router.get('/recipe/:id', recipeCtrl.getRecipe);

router.get('/users', userCtrl.getUsers);
router.get('/user/:id', userCtrl.getUser);

module.exports = router;