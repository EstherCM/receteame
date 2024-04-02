import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TypeRecipe, IRecipe } from 'recipe-models';

import { RecipeRepository } from '../../2_domain/repositories/recipe.class';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesSubject = new BehaviorSubject<IRecipe[]>([]);
  public recipes$ = this.recipesSubject.asObservable();

  private recipeSubject = new BehaviorSubject<IRecipe | null>(null);
  public recipe$ = this.recipeSubject.asObservable();

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
    return this.recipeRepository
      .get(this.filters, this.currentPage, this.pageSize)
      .subscribe({
        next: ({ recipes, total }) => {
          this.recipesSubject.next(recipes);
          this.totalItemsSubject.next(total);
        },
        error: (error) => console.error('🔥 Error getting recipe:', error),
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

  getById(id: string): Observable<IRecipe> {
    return this.recipeRepository
      .getById(id)
      .pipe(tap((recipe) => this.recipeSubject.next(recipe)));
  }

  delete(id: string) {
    return this.recipeRepository.delete(id).pipe(
      tap(() => {
        const currentRecipe = this.recipeSubject.value;
        if (currentRecipe && currentRecipe.id === id) {
          this.recipeSubject.next(null);
        }
      })
    );
  }
}
