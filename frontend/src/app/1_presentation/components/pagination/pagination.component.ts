import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  totalPages: number[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    const recipesPerPage = this.recipesService.pageSize;
    this.recipesService.totalItems$.subscribe(
      (total) =>
        (this.totalPages = Array.from(
          { length: Math.ceil(total / recipesPerPage) },
          (_, index) => index + 1
        ))
    );
  }

  goToPage(page: number) {
    this.recipesService.currentPage = page;
    this.recipesService.get();
  }
}
