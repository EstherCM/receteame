const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('./app');
const { Recipe } = require('./database/models/recipeModel');

console.info = jest.fn();

describe('[app routes] integration test /api/v1/', () => {
  const baseUrl = '/api/v1/';

  beforeAll(async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI_DEV || 'mongodb://127.0.0.1:27017/receteame');
    } catch (e) {
      console.error(`🔥 Error connect mongoose in integration test ${e}`);
    }
  });

  afterAll(async () => {
    try {
      await Recipe.deleteMany({ name: { $regex: /Integration Test/i } });
    } catch (e) {
      console.error(`🔥 Error deleting recipes ${e}`);
    } finally {
      await mongoose.connection.close();
      server.close();
    }
  });

  describe('recipes', () => {
    describe('POST', () => {
      it('/api/v1/recipes should return 200 and recipe is saved', async () => {
        const newRecipe = {
          name: 'Recipe Integration Test',
          ingredients: [],
          preparation: []
        };
        const res = await request(app).post(`${baseUrl}recipes`).send(newRecipe);

        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual(newRecipe.name);
        expect(res.body.ingredients).toEqual(newRecipe.ingredients);
        expect(res.body.preparation).toEqual(newRecipe.preparation);
      });

      it('/api/v1/recipes should return 400 if some properties are missing', async () => {
        const newRecipe = {
          name: 'Recipe Integration Test',
          ingredients: [],
        };
        const res = await request(app).post(`${baseUrl}/recipes`).send(newRecipe);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Bad Request: Some properties are missing');
      });
    });

    describe('GET', () => {
      it('/api/v1/recipes should return 200', async () => {
        const res = await request(app).get(`${baseUrl}recipes`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.recipes.length).toBeGreaterThan(0);
      });

      it('/api/v1/nonExistentRecipe should return 404', async () => {
        const res = await request(app).get(`${baseUrl}nonExistentRecipe`);

        expect(res.statusCode).toEqual(404);
      });
    });
  });
});
