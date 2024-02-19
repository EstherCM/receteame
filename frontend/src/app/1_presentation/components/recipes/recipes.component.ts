import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormArray } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule, MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

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
  imports: [ReactiveFormsModule, MatSliderModule, MatFormFieldModule, MatChipsModule, MatIconModule],
  animations: []
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];

  searchRecipeForm = new FormGroup({
    name: new FormControl(''),
    ingredients: new FormArray([]),
    people: new FormArray([]),
    time: new FormGroup({
      start: new FormControl(1),
      end: new FormControl(240),
    }),
    type: new FormControl(),
  });

  ingredients: string[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  people = [1, 2, 4, 8];
  min = 0;
  max = 240;
  stepValue = 5;
  types = [
    TypeRecipe.starter,
    TypeRecipe.first,
    TypeRecipe.second,
    TypeRecipe.dessert,
    TypeRecipe.snack,
    TypeRecipe.dessert,
  ];

  constructor(private recipeRepository: RecipeRepository) {}

  ngOnInit(): void {
    this.recipeRepository.get({}).subscribe({
      next: (recipes: IRecipe[]) => (this.recipes = recipes),
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
  }

  addIngredient($event: MatChipInputEvent) {
    const value = ($event.value || '').trim();
    const ingredientForm = this.searchRecipeForm.get('ingredients') as FormArray;

    if (value) {
      this.ingredients.push(value);
      ingredientForm.push(new FormControl(value));
    }

    $event.chipInput!.clear();
  }

  removeIngredient(ingredient: string) {
    const index = this.ingredients.indexOf(ingredient);
    const ingredientForm = this.searchRecipeForm.get('ingredients') as FormArray;

    if (index >= 0) {
      this.ingredients.splice(index, 1);
      ingredientForm.removeAt(index);
    }

  }

  editIngredient(ingredient: string, $event: MatChipEditedEvent) {
    const value = $event.value.trim();

    if (!value) {
      this.removeIngredient(ingredient);
      return;
    }

    const index = this.ingredients.indexOf(ingredient);
    const ingredientForm = this.searchRecipeForm.get('ingredients') as FormArray;

    if (index >= 0) {
      const ingredientControl = ingredientForm.at(index) as FormControl;

      this.ingredients[index] = value;
      ingredientControl.setValue(value);
    }
  }

  onChangePeople($event: Event) {
    const checkedValue = ($event.target as HTMLInputElement).value;
    const isChecked = ($event.target as HTMLInputElement).checked;
    const checkedPeople = this.searchRecipeForm.get('people') as FormArray;

    if (isChecked) {
      checkedPeople.push(new FormControl(checkedValue));
    } else {
      let i = 0;

      checkedPeople.controls.forEach((control) => {
        if (control.value === checkedValue) {
          checkedPeople.removeAt(i);
        }
        i++;
      });
    }
  }

  onSliderMinInput($event: Event) {
    const sliderValue = ($event.target as HTMLInputElement).value;
    const timeControl = this.searchRecipeForm.get('time');

    if (timeControl) {
      const { end } = timeControl.value;

      timeControl.patchValue({
        start: Number(sliderValue),
        end,
      });
    }
  }

  onSliderMaxInput($event: Event) {
    const sliderValue = ($event.target as HTMLInputElement).value;
    const timeControl = this.searchRecipeForm.get('time');

    if (timeControl) {
      const { start } = timeControl.value;

      timeControl.patchValue({
        start,
        end: Number(sliderValue),
      });
    }
  }

  formatLabel(value: number): string {
    return String(value);
  }

  onChangeType($event: Event) {
    const selectedValue = ($event.target as HTMLSelectElement).value;
    const selectedType = this.searchRecipeForm.get('type') as FormControl;

    selectedType.setValue(selectedValue);
  }

  onSubmit() {
    const formValue = this.searchRecipeForm.value;

    const filters = {
      name: formValue.name || '',
      ingredients: formValue.ingredients || [],
      people: formValue.people || [],
      time: {
        start: formValue.time?.start || 1,
        end: formValue.time?.end || 240,
      },
      type: formValue.type || undefined,
    };

    this.recipeRepository.get(filters).subscribe({
      next: (recipes: IRecipe[]) => (this.recipes = recipes),
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
  }
}
