import { Component, ElementRef, OnInit } from '@angular/core';

import { IRecipe } from '../../../../../../backend/src/database/models/recipeModel';
import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  templateUrl: './recipes.component.html',
  styleUrls: [
    '../../../../styles/recipes-view.scss',
    '../../../../styles/recipe-list.scss',
    '../../../../styles/recipe-item.scss',
    '../../../../styles/components/button.scss'
  ],
  imports: [FiltersComponent, PaginationComponent]
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];
  showFilterBar = false;

  constructor(private el: ElementRef, private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.get();
    this.recipesService.recipes$.subscribe((recipes) => this.recipes = recipes);
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));
  }

  closeFilters() {
    this.showFilterBar = false;
  }

  toggleFilterBar(event: Event) {
    event.stopPropagation();

    this.showFilterBar = !this.showFilterBar;
  }

  handleOutFilterClick(event: Event) {
    const appFiltersElement = this.el.nativeElement.querySelector('#filtersBar');
    const clickedNode = event.target as Node;

    if (!this.isInFilterBar(appFiltersElement, clickedNode)) {
      this.closeFilters();
    }
  }

  private isInFilterBar(parent: Node, child: Node): boolean {
    let node: Node | null = child;

    while (node !== null && node !== parent) {
      node = node.parentNode;
    }

    return node === parent;
  }

  updateRecipes(recipes: IRecipe[]) {
    this.recipes = recipes;
    this.closeFilters();
  }
}
