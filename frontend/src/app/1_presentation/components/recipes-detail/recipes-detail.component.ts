import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IRecipe } from 'recipe-models';
import { Subject, takeUntil } from 'rxjs';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipes-detail.component.html',
})
export class RecipesDetailComponent {
  public recipeId!: string | null;
  public recipe!: IRecipe;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';

    this.recipesService
      .getById(this.recipeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((initialSuperhero) => this.recipe = initialSuperhero);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
