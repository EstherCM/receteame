import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { RecipeAdapter } from '../../3_adapter/recipe.class';
import { IRecipe } from '../../../../../backend/src/database/models/recipeModel';
import { TypeRecipe } from '../models/type-recipe.enum';

@Injectable({
  providedIn: 'root',
})

export class RecipeRepository {
  constructor(private readonly recipeAdapter: RecipeAdapter) {}

  get(filters: Partial<{ name: string; ingredients: string[]; people: number[]; time: string; type: TypeRecipe; }>): Observable<IRecipe[]> {
    let queryParams = new HttpParams();

    if (filters.name !== undefined && filters.name !== '') {
      queryParams = queryParams.set('name', filters.name);
    }

    if (filters.ingredients && filters.ingredients.length > 0) {
      const ingredientStringArray = filters.ingredients.map(String);

      ingredientStringArray.forEach((ingredient) => {
        queryParams = queryParams.append('ingredients', ingredient);
      });
    }
    if (filters.people && filters.people.length > 0) {
      const peopleStringArray = filters.people.map(String);

      peopleStringArray.forEach((person) => {
        queryParams = queryParams.append('people', person);
      });
    }

    if (filters.time) {
      queryParams = queryParams.set('time', filters.time);
    }

    if (filters.type) {
      queryParams = queryParams.set('type', filters.type);
    }

    return this.recipeAdapter.get(queryParams);
  }
  
  getById(id: string): Observable<IRecipe> {
    return this.recipeAdapter.getById(id);
  }
}
