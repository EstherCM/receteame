import { IRecipe } from '../models/recipeModel';

const Recipe = require('../models/recipeModel');

const create = async (body: IRecipe) => {
  try {
    return await Recipe.create(body);
  } catch (e) {
    console.error(`🔥 [DAO] Error creating recipe ${e}`);
    return e;
  }
};

const getById = async (id: string) => {
  try {
    return await Recipe.find({ _id: id });
  } catch (e) {
    console.error(`🔥 [DAO] Error getting recipe by ${id} ${e}`);
    return e;
  }
};

const update = async (id: string, propsToUpdate: IRecipe) => {
  try {
    return await Recipe.findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  } catch (e) {
    console.error(`🔥 [DAO] Error updating recipe ${e}`);
    return e;
  }
};

const remove = async (id: string) => {
  try {
    return await Recipe.deleteOne({ _id: id });
  } catch (e) {
    console.error(`🔥 Error deleting recipe ${e}`);
    return e;
  }
};

module.exports = {
  create,
  getById,
  update,
  remove
};