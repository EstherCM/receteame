import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../../../../../../backend/src/database/models/recipeModel';
import { RecipeRepository } from '../../../2_domain/repositories/recipe.class';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  recipes!: IRecipe;

  constructor(private recipeRepository: RecipeRepository) {}

  ngOnInit(): void {
    const id = '63d66c04238937215a89f9f6';

    this.recipeRepository.getById(id).subscribe({
      next: (recipes: IRecipe) => this.recipes = recipes,
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
  }
}
