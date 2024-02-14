import { Request, Response } from 'express';
import { create, getById, getRecipes, update, remove } from '../recipeCtrl';
const recipeService = require('../../services/recipeService');

jest.mock('../../services/recipeService');

describe('[recipeCtrl] unit test', () => {
  describe('create', () => {
    it('should create a recipe', async () => {
      const mockedReq = {
        user: {
          id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.create.mockResolvedValue({
        _id: 'mockedId',
        name: 'mockedName',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      });

      await create(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(201);
      expect(mockedRes.json).toHaveBeenCalledWith({
        _id: 'mockedId',
        name: 'mockedName',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        user: {
          id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.create.mockRejectedValue({ error: 'Error creating recipe' });

      await create(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error creating recipe' });
    });
  });

  describe('getById', () => {
    it('should get a recipe by id', async () => {
      const mockedReq = {
        params: {
          _id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.getById.mockResolvedValue([
        {
          _id: 'mockedId',
          name: 'mockedName',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);

      await getById(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith([
        {
          _id: 'mockedId',
          name: 'mockedName',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        params: {
          _id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.getById.mockRejectedValue({ error: 'Error getting recipe' });

      await getById(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error getting recipe' });
    });
  });

  describe('getRecipes', () => {
    it('should get recipes', async () => {
      const mockedReq = {
        query: {
          _id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.getRecipes.mockResolvedValue([
        {
          _id: 'mockedId',
          name: 'mockedName',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);

      await getRecipes(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith([
        {
          _id: 'mockedId',
          name: 'mockedName',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        query: {
          _id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.getRecipes.mockRejectedValue({ error: 'Error getting recipes' });

      await getRecipes(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error getting recipes' });
    });
  });

  describe('update', () => {
    it('should update data of one recipe', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId',
        },
        body: {
          name: 'mockedName2',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.update.mockResolvedValue([
        {
          _id: 'mockedId',
          name: 'mockedName2',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);

      await update(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith([
        {
          _id: 'mockedId',
          name: 'mockedName2',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ]);
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId',
        },
        body: {
          name: 'mockedName2',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.update.mockRejectedValue({ error: 'Error updating recipes' });

      await update(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error updating recipes' });
    });
  });

  describe('remove', () => {
    it('should delete a recipe', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.remove.mockResolvedValue({ success: true });

      await remove(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.status).toHaveBeenCalledWith(200);
      expect(mockedRes.json).toHaveBeenCalledWith({ success: true });
    });

    it('should failed when something is wrong', async () => {
      const mockedReq = {
        params: {
          id: 'mockedId',
        },
      } as Partial<Request>;
      const mockedRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;
      const mockedNext = jest.fn();

      recipeService.remove.mockRejectedValue({ error: 'Error deleting recipes' });

      await remove(mockedReq as Request, mockedRes as Response, mockedNext);

      expect(mockedRes.json).toHaveBeenCalledTimes(0);
      expect(mockedRes.status).toHaveBeenCalledTimes(0);
      expect(mockedNext).toHaveBeenCalled();
      expect(mockedNext.mock.calls[0][0]).toEqual({ error: 'Error deleting recipes' });
    });
  });
});
