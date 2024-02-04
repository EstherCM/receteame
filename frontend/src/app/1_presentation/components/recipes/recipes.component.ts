import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { IRecipe } from '../../../../../../backend/src/database/models/recipeModel';
import { RecipeRepository } from '../../../2_domain/repositories/recipe.class';
import { TypeRecipe } from '../../../2_domain/models/type-recipe.enum';

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
    '../../../../styles/button.scss',
  ],
  imports: [ReactiveFormsModule],
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];

  searchRecipeForm = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormControl(''),
    people: new FormArray([]),
    time: new FormControl(''),
    type: new FormControl([
      TypeRecipe.starter,
      TypeRecipe.first,
      TypeRecipe.second,
      TypeRecipe.dessert,
      TypeRecipe.snack,
      TypeRecipe.dessert,
    ]),
  });

  types: [TypeRecipe] = [TypeRecipe.starter];
  people = [1, 2, 4, 8];

  constructor(private recipeRepository: RecipeRepository) {}

  ngOnInit(): void {
    this.recipeRepository.get({}).subscribe({
      next: (recipes: IRecipe[]) => {
        return (this.recipes = recipes);
      },
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
    this.types = this.getTypes;
  }

  get getPeople(): FormArray {
    return this.searchRecipeForm.get('people') as FormArray;
  }

  get getTypes() {
    return (this.searchRecipeForm.get('type') as FormArray).value;
  }

  onChange($event: Event) {
    const checkedValue = ($event.target as HTMLInputElement).value;
    const isChecked = ($event.target as HTMLInputElement).checked;

    const checkedArray = this.searchRecipeForm.get('people') as FormArray;

    if (isChecked) {
      checkedArray.push(new FormControl(checkedValue));
    } else {
      let i = 0;

      checkedArray.controls.forEach((control) => {
        if (control.value === checkedValue) {
          checkedArray.removeAt(i);
        }
        i++;
      });
    }
  }

  onSubmit() {
    console.log('form', this.searchRecipeForm.value);
  }
}
