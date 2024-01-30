import { Component } from '@angular/core';
import { RecipesComponent } from './1_presentation/components/recipes/recipes.component';
import "@fontsource/satisfy";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['../styles/header.scss']
})
export class AppComponent {
  title = 'Receteame';
}
