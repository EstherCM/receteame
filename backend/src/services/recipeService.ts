import { IRecipe } from '../database/models/recipeModel';
const RecipeDAO = require('../database/daos/recipeDAO');
const _ = require('underscore');

const create = async ({
  name,
  image,
  ingredients,
  preparation,
  people,
  time,
  notes,
  tags,
  type,
}: IRecipe) => {
  try {
    return await RecipeDAO.create({
      name,
      image,
      ingredients,
      preparation,
      people,
      time,
      notes,
      tags,
      type,
    });
  } catch (e) {
    return { error: e };
  }
};

const getById = async (id: string) => {
  try {
    return await RecipeDAO.getBy({ _id: id });
  } catch (e) {
    return { error: e };
  }
};

const getRecipes = async (query: { [x: string]: string }) => {
  let criterial: { [x: string]: string } = {};

  const propsToFind = ['name', 'ingredients', 'people', 'time', 'type'];

  propsToFind.forEach((prop) => {
    if (_.has(query, prop)) {
      criterial[prop] = query[prop];
    }
  });

  try {
    return await RecipeDAO.getBy(criterial);
  } catch (e) {
    return { error: e };
  }
};

const update = async (
  id: string,
  { name, ingredients, preparation, people, time, notes, tags, type }: IRecipe
) => {
  try {
    return await RecipeDAO.update(id, {
      name,
      ingredients,
      preparation,
      people,
      time,
      notes,
      tags,
      type,
    });
  } catch (e) {
    return { error: e };
  }
};

const remove = async (id: string) => {
  try {
    const { deletedCount } = await RecipeDAO.remove(id);

    if (deletedCount !== 1) {
      return { error: "Something was wrong. Recipe couldn't be removed" };
    }
    return { success: true };
  } catch (e) {
    return { error: e };
  }
};

module.exports = {
  create,
  getById,
  getRecipes,
  update,
  remove,
};
