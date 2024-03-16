import { test, expect } from '@playwright/test';
import { TypeRecipe } from 'recipe-models/src/enums/type-recipe.enum';

import { RecipeFiltersPage } from './pageObjects/recipe-filters-page';

const mockRecipes = [
  {
    name: 'Torrijas',
    image:
      'https://www.sherry.wine/media/images/torrijas_0.width-876.png',
    ingredients: ['Pan', 'Leche'],
    preparation: ['Infusionar el plan en la leche'],
    people: 2,
    time: 40,
    notes: '',
    tags: [],
    type: [TypeRecipe.dessert],
  },
  {
    name: 'Cocido',
    image:
      'https://s1.abcstatics.com/media/gurmesevilla/2020/04/cocido-madrileno-receta.jpg',
    ingredients: ['Garbanzos'],
    preparation: ['Hacer el cocido'],
    people: 8,
    time: 240,
    notes: '',
    tags: [],
    type: [TypeRecipe.first],
  },
];

test('se visualiza el filtro Nombre', async ({ page }) => {
  const mockedRoute = 'http://localhost:3000/api/v1/recipes?page=1&pageSize=9';
  await page.route(mockedRoute, async (route) => {
    await route.fulfill({ json: mockRecipes });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);
  const nameLabel = '[data-test="recipeNameLabel"]';

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();
  await page.waitForSelector(nameLabel);

  const labelExists = (await page.$(nameLabel)) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Ingredientes', async ({ page }) => {
  const mockedRoute = 'http://localhost:3000/api/v1/recipes?page=1&pageSize=9';
  await page.route(mockedRoute, async (route) => {
    await route.fulfill({ json: mockRecipes });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);
  const ingredientsLabel = '[data-test="recipeIngredientsLabel"]';

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();
  await page.waitForSelector(ingredientsLabel);

  const labelExists = (await page.$(ingredientsLabel)) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Personas', async ({ page }) => {
  const mockedRoute = 'http://localhost:3000/api/v1/recipes?page=1&pageSize=9';
  await page.route(mockedRoute, async (route) => {
    await route.fulfill({ json: mockRecipes });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);
  const peopleLabel = '[data-test="recipePeopleLabel"]';

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();
  await page.waitForSelector(peopleLabel);

  const labelExists = (await page.$(peopleLabel)) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Tiempo', async ({ page }) => {
  const mockedRoute = 'http://localhost:3000/api/v1/recipes?page=1&pageSize=9';
  await page.route(mockedRoute, async (route) => {
    await route.fulfill({ json: mockRecipes });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);
  const timeLabel = '[data-test="recipeTimeLabel"]';

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();
  await page.waitForSelector(timeLabel);

  const labelExists = (await page.$(timeLabel)) !== null;
  expect(labelExists).toBe(true);
});

test('se visualiza el filtro Tipo', async ({ page }) => {
  const mockedRoute = 'http://localhost:3000/api/v1/recipes?page=1&pageSize=9';
  await page.route(mockedRoute, async (route) => {
    await route.fulfill({ json: mockRecipes });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);
  const typeLabel = '[data-test="recipeTypeLabel"]';

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();
  await page.waitForSelector(typeLabel);

  const labelExists = (await page.$(typeLabel)) !== null;
  expect(labelExists).toBe(true);
});

test('se puede filtrar por Nombre', async ({ page }) => {
  const name = 'Cocido';
  const mockedRoute = `http://localhost:3000/api/v1/recipes?name=${name}&time=1-240&page=1&pageSize=9`;
  await page.route(mockedRoute, async (route) => {
    const recipe = mockRecipes.filter((r) => r.name === name);
    await route.fulfill({ json: recipe });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();

  const recipesCount = await recipeFilterPage.filterByName(name);

  expect(recipesCount).toBe(1);
});

test('se puede filtrar por Ingredients', async ({ page }) => {
  const ingredient = 'Pan';
  const mockedRoute = `http://localhost:3000/api/v1/recipes?ingredients=${ingredient}&time=1-240&page=1&pageSize=9`;
  await page.route(mockedRoute, async (route) => {
    const recipe = mockRecipes.filter((r) => r.ingredients.includes(ingredient));
    await route.fulfill({ json: recipe });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();

  const recipesCount = await recipeFilterPage.filterByIngredients(ingredient);

  expect(recipesCount).toBe(1);
});

test('se puede filtrar por People', async ({ page }) => {
  const people = 4;
  const mockedRoute = `http://localhost:3000/api/v1/recipes?people=${people}&time=1-240&page=1&pageSize=9`;
  await page.route(mockedRoute, async (route) => {
    const recipe = mockRecipes.filter((r) => r.people === people);
    await route.fulfill({ json: recipe });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();

  const recipesCount = await recipeFilterPage.filterByPeople(people);

  expect(recipesCount).toBe(0);
});

test('se puede filtrar por Time', async ({ page }) => {
  const [start, end] = [20, 40];
  const mockedRoute = `http://localhost:3000/api/v1/recipes?time=${start}-${end}&page=1&pageSize=9`;
  console.log('1', mockedRoute)

  await page.route(mockedRoute, async (route) => {
    const recipe = mockRecipes.filter((r) => r.time >= start && r.time <= end);
    await route.fulfill({ json: recipe });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();

  const recipesCount = await recipeFilterPage.filterByTime(start, end);

  expect(recipesCount).toBe(1);
});

test('se puede filtrar por Type', async ({ page }) => {
  const type = TypeRecipe.first;
  const mockedRoute = `http://localhost:3000/api/v1/recipes?time=1-240&type=${type}&page=1&pageSize=9`;
  console.log({mockedRoute})
  await page.route(mockedRoute, async (route) => {
    const recipe = mockRecipes.filter((r) => r.type.includes(type));
    await route.fulfill({ json: recipe });
  });

  const recipeFilterPage = new RecipeFiltersPage(page);

  await recipeFilterPage.navigate();
  await recipeFilterPage.openFilters();

  const recipesCount = await recipeFilterPage.filterByType(TypeRecipe.first);

  expect(recipesCount).toBe(1);
});
