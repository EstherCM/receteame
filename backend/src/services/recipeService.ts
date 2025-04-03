import { IRecipe } from 'recipe-models';
import RecipeDAO from '../database/daos/recipeDAO';
import _ from 'underscore';

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
    return await RecipeDAO.getById(id);
  } catch (e) {
    return null;
  }
};

const getRecipes = async (query: any) => {
  let criterial: any = {};

  const propsToFind = ['name', 'ingredients', 'people', 'time', 'type'];

  propsToFind.forEach((prop) => {
    if (_.has(query, prop)) {
      if (prop === 'time') {
        const [start, end] = (query['time'] as string).split('-');
        criterial[prop] = { $gte: Number(start), $lte: Number(end) };
      } else if (prop === 'ingredients') {
        const ingredients = Array.isArray(query[prop]) ? query[prop] : [query[prop]];
        criterial[prop] = { $all: (ingredients as string[]).map((ingredient) => new RegExp(ingredient, 'i')) };
      } else {
        criterial[prop] = query[prop];
      }
    }
  });

  try {
    const page = Number(query.page);
    const pageSize = Number(query.pageSize);
    return await RecipeDAO.getBy(criterial, page, pageSize);
  } catch (e) {
    return { error: e };
  }
};

const update = async (
  id: string,
  { name, ingredients, preparation, people, time, notes, tags, type }: IRecipe,
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

const countRecipes = async () => {
  try {
    return await RecipeDAO.countRecipes();
  } catch (e) {
    return { error: e };
  }
};

export default {
  create,
  getById,
  getRecipes,
  update,
  remove,
  countRecipes,
};
