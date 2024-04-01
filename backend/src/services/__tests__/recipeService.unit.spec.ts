const recipeService = require('../recipeService');
const recipeDAO = require('../../database/daos/recipeDAO');

jest.mock('../../database/daos/recipeDAO');

describe('[recipeService] unit test', () => {
  describe('create', () => {
    it('should call recipeDAO.create', async () => {
      const mockedRecipe = {
        name: 'mockedName',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };

      await recipeService.create(mockedRecipe);

      expect(recipeDAO.create).toHaveBeenCalledWith(mockedRecipe);
    });

    it('should failed when something is wrong', async () => {
      const mockedRecipe = {
        name: 'mockedName',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };
      const mockedError = new Error('Error creating recipe');
      recipeDAO.create.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.create(mockedRecipe);

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.create).toHaveBeenCalledWith(mockedRecipe);
    });
  });

  describe('getById', () => {
    it('should find recipe by id', async () => {
      const mockedRecipe = '2';

      await recipeService.getById('2');

      expect(recipeDAO.getById).toHaveBeenCalledWith(mockedRecipe);
    });

    it('should failed when something is wrong', async () => {
      const mockedRecipe = '2';
      const mockedError = new Error('[recipeService-unit] Error getting recipe');
      recipeDAO.getById.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.getById('2');

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.getById).toHaveBeenCalledWith(mockedRecipe);
    });
  });

  describe('getRecipes', () => {
    it('should find recipe', async () => {
      const mockedRecipe = {
        name: 'mockedName2',
        time: '1-60',
        ingredients: ['ingredient'],
        page: 1,
        pageSize: 9,
      };
      const getByMock = jest.fn();
      recipeDAO.getBy = getByMock;

      await recipeService.getRecipes(mockedRecipe);

      expect(recipeDAO.getBy).toHaveBeenCalledWith(
        {
          name: 'mockedName2',
          time: {
            $gte: 1,
            $lte: 60,
          },
          ingredients: { $all: [/ingredient/i] },
        },
        mockedRecipe.page,
        mockedRecipe.pageSize,
      );
    });

    it('should failed when something is wrong', async () => {
      const mockedRecipe = {
        name: 'mockedName2',
        page: 1,
        pageSize: 9,
      };
      const getByMock = jest.fn();
      recipeDAO.getBy = getByMock;
      const mockedError = new Error('[recipeService-unit] Error getting recipe');
      recipeDAO.getBy.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.getRecipes(mockedRecipe);

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.getBy).toHaveBeenCalledWith(
        { name: 'mockedName2' },
        mockedRecipe.page,
        mockedRecipe.pageSize,
      );
    });
  });

  describe('update', () => {
    it('should call recipeDAO.update', async () => {
      const id = 'mockedId';
      const mockedRecipe = {
        name: 'mockedName',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };

      await recipeService.update(id, mockedRecipe);

      expect(recipeDAO.update).toHaveBeenCalledWith(id, mockedRecipe);
    });

    it('should failed when something is wrong', async () => {
      const id = 'mockedId';
      const mockedRecipe = {
        name: 'mockedName',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };

      const mockedError = new Error('Error deleting recipe');
      recipeDAO.update.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.update(id, mockedRecipe);

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.update).toHaveBeenCalledWith(id, mockedRecipe);
    });
  });

  describe('remove', () => {
    it('should call recipeDAO.remove', async () => {
      const id = 'mockedId';

      await recipeService.remove(id);

      expect(recipeDAO.remove).toHaveBeenCalledWith(id);
    });

    it('should return success', async () => {
      const id = 'mockedId';

      recipeDAO.remove.mockResolvedValue({ deletedCount: 1 });

      const result = await recipeService.remove(id);

      expect(result).toEqual({ success: true });
    });

    it("should return error if recipe can't be deleted", async () => {
      const id = 'mockedId';

      recipeDAO.remove.mockResolvedValue({ deletedCount: 0 });

      const result = await recipeService.remove(id);

      expect(result.error).toEqual('Something was wrong. Recipe couldn\'t be removed');
    });

    it('should failed when something is wrong', async () => {
      const id = 'mockedId';

      const mockedError = new Error('Error deleting recipe');
      recipeDAO.remove.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.remove(id);

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('countRecipes', () => {
    it('should call recipeDAO.countRecipes', async () => {
      await recipeService.countRecipes();

      expect(recipeDAO.countRecipes).toHaveBeenCalled();
    });

    it('should failed when something is wrong', async () => {
      const mockedError = new Error('Error counting recipe');
      recipeDAO.countRecipes.mockRejectedValueOnce({ error: mockedError });

      const result = await recipeService.countRecipes();

      expect(result.error).toEqual({ error: mockedError });
      expect(recipeDAO.countRecipes).toHaveBeenCalled();
    });
  });
});
