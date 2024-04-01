import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader';
import { IRecipe } from 'recipe-models';

import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.component.html',
  styleUrls: [
    '../../../../styles/recipes-view.scss',
    '../../../../styles/recipe-list.scss',
    '../../../../styles/recipe-item.scss',
    '../../../../styles/components/button.scss'
  ],
  imports: [FiltersComponent, PaginationComponent, NgxSkeletonLoaderModule]
})
export class RecipesListComponent implements OnInit {
  recipes: IRecipe[] = [];
  showFilterBar = false;
  isLoading = true;
  themeConfig: NgxSkeletonLoaderConfigTheme = {
    width: '550px',
    height: '380px',
    borderRadius: '10px',
    shape: 'rect'
  };
  recipesPerPage = 9;

  constructor(private el: ElementRef, private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipesService.get();
    this.recipesService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
      this.isLoading = false;
    });
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
