import { Page } from 'playwright';

export class RecipeFiltersPage {
  private page: Page;
  private buttonSelector = '[data-test="searchButton"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('http://localhost:4200/');
  }

  async openFilters() {
    const filtersButtonSelector = '[data-test="filtersButton"]';

    await this.page.waitForSelector(filtersButtonSelector);
    await this.page.click(filtersButtonSelector);
  }

  async filterByName(attributeName: string) {
    await this.page.fill('[data-test="recipeNameLabel"]', attributeName);
    await this.page.click(this.buttonSelector);

    return await this.page.evaluate((prefix: any) => document.querySelectorAll(`[data-test^="${prefix}"]`).length, 'recipe-');
  }

  async filterByIngredients(value: string) {
    const selector = '[data-test="recipeIngredientsInput"] input';

    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
    await this.page.click(this.buttonSelector);

    return await this.page.evaluate((prefix: any) => document.querySelectorAll(`[data-test^="${prefix}"]`).length, 'recipe-');
  }

  async filterByPeople(quantity: number) {
    const selector = `[data-test="recipePeopleInput-${quantity}"]`;

    await this.page.waitForSelector(selector);

    await this.page.locator(selector).check();

    await this.page.click(this.buttonSelector);

    return await this.page.evaluate((prefix: any) => document.querySelectorAll(`[data-test^="${prefix}"]`).length, 'recipe-');
  }

  async filterByTime(min: number, max: number) {
    const minSliderSelector = '[data-test="recipeMinTimeInput"]';
    const maxSliderSelector = '[data-test="recipeMaxTimeInput"]';

    await this.page.waitForSelector(minSliderSelector);
    await this.page.waitForSelector(maxSliderSelector);

    const minSlider = await this.page.$(minSliderSelector);
    const maxSlider = await this.page.$(maxSliderSelector);

    await minSlider?.evaluate((slider: HTMLInputElement, min: any) => {
      (slider as HTMLInputElement).value = String(min);
      slider.dispatchEvent(new Event('input'));
    }, min);

    await maxSlider?.evaluate((slider: HTMLInputElement, max: any) => {
      (slider as HTMLInputElement).value = String(max);
      slider.dispatchEvent(new Event('input'));
    }, max);

    await this.page.click(this.buttonSelector);

    return await this.page.evaluate((prefix: any) => document.querySelectorAll(`[data-test^="${prefix}"]`).length, 'recipe-');
  }

  async filterByType(value: string) {
    const selector = '[data-test="recipeTypeSelect"]';

    await this.page.selectOption(selector, value);

    await this.page.click(this.buttonSelector);

    return await this.page.evaluate((prefix: any) => document.querySelectorAll(`[data-test^="${prefix}"]`).length, 'recipe-');
  }
}
