import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: [
    '../../../../styles/pagination.scss',
    '../../../../styles/components/button.scss',
  ],
})
export class PaginationComponent {
  public totalPages: number[] = [];

  constructor(public recipesService: RecipesService) {}

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
