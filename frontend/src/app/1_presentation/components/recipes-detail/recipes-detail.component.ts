import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from 'recipe-models';
import { Subject, takeUntil } from 'rxjs';

import { RecipesService } from '../../services/recipes.service';
import { MinutesToHours } from '../../pipes/minutes-to-hours.pipe';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-recipes-detail',
  standalone: true,
  imports: [MinutesToHours, ConfirmationDialogComponent],
  templateUrl: './recipes-detail.component.html',
  styleUrls: [
    '../../../../styles/recipe-info.scss',
    '../../../../styles/components/logo.scss',
  ],
})
export class RecipesDetailComponent {
  public recipeId!: string | null;
  public recipe!: IRecipe;
  public deleteDialog = '¿Quieres eliminar esta receta?';

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';

    this.recipesService
      .getById(this.recipeId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((initialSuperhero) => (this.recipe = initialSuperhero));

    this.confirmationDialogService.confirmAction$.subscribe((value) => {
      if (value) {
        this.delete();
      }
    });
  }

  getPeopleLogo() {
    const peopleLogo: { [key: number]: string } & { default: string } = {
      1: '1person.png',
      2: '4people.png', // TODO: cambiar a 2
      4: '4people.png',
      8: '4people.png', // TODO: cambiar a 8
      default: 'none.png', // TODO: encontrar logo para ninguno
    };

    const imagen = peopleLogo[this.recipe.people ?? 'default'];

    return `../../../../assets/${imagen}`;
  }

  showConfirmationDialog() {
    this.confirmationDialogService.showDialog();
  }

  private delete() {
    const id = this.recipeId || '';

    this.recipesService.delete(id).subscribe((isDeleted) => {
      this.confirmationDialogService.closeDialog();
      this.confirmationDialogService.closeConfirmation();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
