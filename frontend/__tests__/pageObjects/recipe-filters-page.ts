import { Page } from 'playwright';

export class RecipeFiltersPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('http://localhost:4200/');
  }

  async filterByName(value: string) {
    await this.page.fill('[data-test="recipeNameLabel"]', value);

    await this.page.click('[data-test="searchButton"]');

    return await this.page.evaluate(() => {
      return document.querySelectorAll('[data-test="Mug Cake"]').length;
    });
  }
}