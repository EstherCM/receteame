require('../config/db.config');
const { Recipe } = require('../model/index');
const { recipes } = require('./recipes');

Recipe
  .create(recipes)
  .then(() => console.info('Created'))
  .catch(err => console.error(err));

