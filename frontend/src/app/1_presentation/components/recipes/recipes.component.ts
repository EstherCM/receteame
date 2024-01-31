import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
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
    '../../../../styles/recipes-filters.scss',
    '../../../../styles/checkbox.scss',
  ],
  imports: [ReactiveFormsModule]
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];

  searchRecipeForm = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormControl(''),
    people: new FormControl([1, 2, 4, 8]),
    time: new FormControl(''),
    type: new FormControl(''),
  });

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

  get getPeopleAmount() {
    return (this.searchRecipeForm.get('people') as FormArray).value;
  }

  onSubmit() {
    console.log(this.searchRecipeForm.value);
  }
}
