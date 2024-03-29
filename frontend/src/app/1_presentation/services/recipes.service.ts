import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TypeRecipe, IRecipe } from 'recipe-models';

import { RecipeRepository } from '../../2_domain/repositories/recipe.class';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesSubject: BehaviorSubject<IRecipe[]> = new BehaviorSubject<IRecipe[]>([]);
  public recipes$: Observable<IRecipe[]> = this.recipesSubject.asObservable();

  private totalItemsSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalItems$: Observable<number> = this.totalItemsSubject.asObservable();

  private filters: Partial<{
    name: string;
    ingredients: string[];
    people: number[];
    time: {
      start: number;
      end: number;
    };
    type: TypeRecipe;
  }> = {};

  public currentPage = 1;
  public pageSize = 9;

  constructor(private recipeRepository: RecipeRepository) {}

  get() {
    return this.recipeRepository.get(this.filters, this.currentPage, this.pageSize).subscribe({
      next: ({ recipes, total }) => {
        this.recipesSubject.next(recipes);
        this.totalItemsSubject.next(total);
      },
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
  }

  setFilters(
    newFilters: Partial<{
      name: string;
      ingredients: string[];
      people: number[];
      time: {
        start: number;
        end: number;
      };
      type: TypeRecipe;
    }>
  ) {
    this.filters = newFilters;

    this.get();
  }
}
