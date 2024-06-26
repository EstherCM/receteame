import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { TypeRecipe, IRecipe } from 'recipe-models';

import { RecipeAdapter } from '../../3_adapter/recipe.class';

@Injectable({
  providedIn: 'root',
})
export class RecipeRepository {
  constructor(private readonly recipeAdapter: RecipeAdapter) {}

  get(
    filters: Partial<{
      name: string;
      ingredients: string[];
      people: number[];
      time: {
        start: number;
        end: number;
      };
      type: TypeRecipe;
    }>,
    page: number = 1,
    pageSize: number = 9
  ): Observable<{ recipes: IRecipe[]; total: number }> {
    let queryParams = new HttpParams();

    if (filters.name !== undefined && filters.name !== '') {
      queryParams = queryParams.set('name', filters.name);
    }

    if (filters.ingredients?.length) {
      const ingredientStringArray = filters.ingredients.map(String);

      ingredientStringArray.forEach((ingredient) => {
        queryParams = queryParams.append('ingredients', ingredient);
      });
    }

    if (filters.people?.length) {
      const peopleStringArray = filters.people.map(String);

      peopleStringArray.forEach((person) => {
        queryParams = queryParams.append('people', person);
      });
    }

    if (filters.time) {
      queryParams = queryParams.set('time', `${filters.time.start}-${filters.time.end}`);
    }

    if (filters.type) {
      queryParams = queryParams.set('type', filters.type);
    }

    if (page) {
      queryParams = queryParams.set('page', page);
    }

    if (pageSize) {
      queryParams = queryParams.set('pageSize', pageSize);
    }

    return this.recipeAdapter.get(queryParams);
  }

  getById(id: string): Observable<IRecipe> {
    return this.recipeAdapter.getById(id);
  }

  delete(id: string): Observable<IRecipe> {
    return this.recipeAdapter.delete(id);
  }
}
