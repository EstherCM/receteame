import { Component, OnInit } from '@angular/core';
import { IRecipe } from '../../../../../../backend/src/database/models/recipeModel';
import { RecipeRepository } from '../../../2_domain/repositories/recipe.class';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrls: [
    '../../../../styles/recipes-view.scss',
    '../../../../styles/recipe-list.scss',
    '../../../../styles/recipe-item.scss',
  ],
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];

  constructor(private recipeRepository: RecipeRepository) {}

  ngOnInit(): void {
    this.recipeRepository.get({}).subscribe({
      next: (recipes: IRecipe[]) => {
        console.log('recipes', recipes);
        return (this.recipes = recipes);
      },
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
  }
}
