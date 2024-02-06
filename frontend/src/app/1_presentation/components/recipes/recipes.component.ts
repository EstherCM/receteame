import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
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
  imports: [ReactiveFormsModule, MatSliderModule],
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

  types = [
    TypeRecipe.starter,
    TypeRecipe.first,
    TypeRecipe.second,
    TypeRecipe.dessert,
    TypeRecipe.snack,
    TypeRecipe.dessert,
  ];
  people = [1, 2, 4, 8];
  min = 1;
  max = 240;

  constructor(private recipeRepository: RecipeRepository) {}

  ngOnInit(): void {
    this.recipeRepository.get({}).subscribe({
      next: (recipes: IRecipe[]) => (this.recipes = recipes),
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
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
