import { Routes } from '@angular/router';

import { RecipesCreateComponent } from './1_presentation/components/recipes-create/recipes-create.component';
import { RecipesListComponent } from './1_presentation/components/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './1_presentation/components/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './1_presentation/components/recipes-edit/recipes-edit.component';

export const routes: Routes = [
  { path: '', component: RecipesListComponent },
  { path: 'recipe/create', component: RecipesCreateComponent },
  { path: 'recipe/:id', component: RecipesDetailComponent },
  { path: 'recipe/:id/edit', component: RecipesEditComponent },
];
