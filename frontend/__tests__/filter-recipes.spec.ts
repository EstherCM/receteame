import { test, expect } from '@playwright/test';
import { RecipeFiltersPage } from './pageObjects/recipe-filters-page';
import exp from 'constants';

test('se visualiza el filtro Nombre', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);
  const nameLabel = '[data-test="recipeNameLabel"]';

  await recipeFilterPage.navigate();
  await page.waitForSelector(nameLabel);

  const labelExists = await page.$(nameLabel) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Ingredientes', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);
  const ingredientsLabel = '[data-test="recipeIngredientsLabel"]';

  await recipeFilterPage.navigate();
  await page.waitForSelector(ingredientsLabel);

  const labelExists = await page.$(ingredientsLabel) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Personas', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);
  const peopleLabel = '[data-test="recipePeopleLabel"]';

  await recipeFilterPage.navigate();
  await page.waitForSelector(peopleLabel);

  const labelExists = await page.$(peopleLabel) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Tiempo', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);
  const timeLabel = '[data-test="recipeTimeLabel"]';

  await recipeFilterPage.navigate();
  await page.waitForSelector(timeLabel);

  const labelExists = await page.$(timeLabel) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Tipo', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);
  const typeLabel = '[data-test="recipeTypeLabel"]';

  await recipeFilterPage.navigate();
  await page.waitForSelector(typeLabel);

  const labelExists = await page.$(typeLabel) !== null;
  expect(labelExists).toBe(true);
});

test('se puede filtrar por Nombre', async ({ page }) => {
  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();

  const recipesCount = await recipeFilterPage.filterByName('Mug cake');
console.log('recipes', recipesCount)
  expect(recipesCount).toBeGreaterThan(0);
});
