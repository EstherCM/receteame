import { IRecipe } from '../models/recipeModel';
import { Recipe } from '../models/recipeModel';

export const create = async (body: IRecipe) => {
  try {
    return await Recipe.create(body);
  } catch (e) {
    console.error(`🔥 [DAO] Error creating recipe ${e}`);
    return e;
  }
};

export const getBy = async (query: { [x: string]: string }) => {
  try {
    return await Recipe.find(query);
  } catch (e) {
    console.error(`🔥 [DAO] Error getting recipe by ${query} ${e}`);
    return e;
  }
};

export const update = async (id: string, propsToUpdate: IRecipe) => {
  try {
    return await Recipe.findByIdAndUpdate({ _id: id }, propsToUpdate, {
      new: true,
    });
  } catch (e) {
    console.error(`🔥 [DAO] Error updating recipe ${e}`);
    return e;
  }
};

export const remove = async (id: string) => {
  try {
    return await Recipe.deleteOne({ _id: id });
  } catch (e) {
    console.error(`🔥 Error deleting recipe ${e}`);
    return e;
  }
};
