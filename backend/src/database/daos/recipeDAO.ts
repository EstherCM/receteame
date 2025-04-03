import { IRecipe } from 'recipe-models';
import { Recipe } from '../models/recipeModel';

export const create = async (body: Omit<IRecipe, 'id'>) => {
  try {
    return await Recipe.create(body);
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error creating recipe ${e}`);
    return null;
  }
};

export const getBy = async (
  query: { [x: string]: string },
  currentPage: number = 1,
  pageSize: number = 9
) => {
  try {
    const skip = (currentPage - 1) * pageSize;
    return await Recipe.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error getting recipe ${query._id}, ${e}`);
    return null;
  }
};

export const getById = async (id: string): Promise<IRecipe[] | null> => {
  try {
    return await Recipe.findById(id);
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error getting recipe by id ${id}, ${e}`);
    return null;
  }
};

export const update = async (id: string, propsToUpdate: Omit<IRecipe, 'id' | 'image'>) => {
  try {
    return await Recipe.findByIdAndUpdate({ _id: id }, propsToUpdate, {
      new: true,
    });
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error updating recipe ${e}`);
    return null;
  }
};

export const remove = async (id: string) => {
  try {
    return await Recipe.deleteOne({ _id: id });
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error deleting recipe ${e}`);
    return { acknowledged: false, deletedCount: 0 };
  }
};

export const countRecipes = async () => {
  try {
    return await Recipe.countDocuments();
  } catch (e) {
    console.error(`🔥 [recipeDAO] Error counting recipes, ${e}`);
    return null;
  }
};

export default { create, getBy, getById, update, remove, countRecipes };
