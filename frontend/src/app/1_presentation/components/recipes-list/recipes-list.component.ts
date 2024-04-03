import { Component, ElementRef, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSkeletonLoaderConfigTheme } from 'ngx-skeleton-loader';
import { IRecipe } from 'recipe-models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { FiltersComponent } from '../filters/filters.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  templateUrl: './recipes-list.component.html',
  styleUrls: [
    '../../../../styles/recipes-list-view.scss',
    '../../../../styles/recipe-list.scss',
    '../../../../styles/recipe-item.scss',
    '../../../../styles/components/button.scss',
  ],
  imports: [FiltersComponent, PaginationComponent, NgxSkeletonLoaderModule],
})
export class RecipesListComponent implements OnInit {
  public recipes: IRecipe[] = [];
  public showFilterBar = false;
  public isLoading = true;
  public themeConfig: NgxSkeletonLoaderConfigTheme = {
    width: '550px',
    height: '380px',
    borderRadius: '10px',
    shape: 'rect',
  };
  public recipesPerPage = 9;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private el: ElementRef,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRecipes();
    document.addEventListener('click', (event) => this.handleOutFilterClick(event));

    this.recipesService.recipeDeleted$.subscribe((isDeleted) => {
      if (isDeleted) {
        this.loadRecipes();
      }
    });
  }

  private loadRecipes() {
    this.recipesService.get();
    this.recipesService.recipes$.subscribe((recipes) => {
      this.recipes = recipes;
      this.isLoading = false;
    });
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

  goToDetail(id: string) {
    this.router.navigate(['/recipe', id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
