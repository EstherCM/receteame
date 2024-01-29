import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { RecipeAdapter } from '../../3_adapter/recipe.class';
import { IRecipe } from '../../../../../backend/src/database/models/recipeModel';

@Injectable({
  providedIn: 'root',
})

export class RecipeRepository {
  constructor(private readonly recipeAdapter: RecipeAdapter) {}

  get(filters: any): Observable<IRecipe[]> {
    let queryParams = new HttpParams();

    if (filters.name) {
      queryParams = queryParams.set('name', filters.name);
    }

    return this.recipeAdapter.get(queryParams);
  }
  
  getById(id: string): Observable<IRecipe> {
    return this.recipeAdapter.getById(id);
  }
}
