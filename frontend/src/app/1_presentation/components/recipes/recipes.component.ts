import { Component, ElementRef, OnInit } from '@angular/core';

import { IRecipe } from '../../../../../../backend/src/database/models/recipeModel';
import { RecipeRepository } from '../../../2_domain/repositories/recipe.class';
import { FiltersComponent } from '../filters/filters.component';

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
  imports: [FiltersComponent]
})
export class RecipesComponent implements OnInit {
  recipes: IRecipe[] = [];
  showFilterBar = false;

  constructor(private recipeRepository: RecipeRepository, private el: ElementRef) {}

  ngOnInit(): void {
    this.recipeRepository.get({}).subscribe({
      next: (recipes: IRecipe[]) => (this.recipes = recipes),
      error: (error) => console.error('🔥 Error getting recipes:', error),
    });
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));
  }

  closeFilters() {
    this.showFilterBar = false;
  }

  toggleFilterBar(event: Event): void {
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
}
