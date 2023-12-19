const { create, getById, update, remove } = require('../recipeDAO');
const Recipe = require('../../models/recipeModel');

describe('[recipeDAO] unit test', () => {
  describe('create', () => {
    const createMock = jest.fn();
    Recipe.create = createMock;

    it('should create a recipe', async () => {
      const mockedNewRecipe = {
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

      const createdRecipe = { ...mockedNewRecipe, _id: 'mockedRecipeId' };
      createMock.mockResolvedValue(createdRecipe);

      const result = await create(mockedNewRecipe);

      expect(result).toBeDefined();
      expect(result._id).toEqual(createdRecipe._id);
      expect(result.name).toEqual(mockedNewRecipe.name);
      expect(result.image).toEqual(mockedNewRecipe.image);
      expect(result.ingredients).toEqual(mockedNewRecipe.ingredients);
      expect(result.preparation).toEqual(mockedNewRecipe.preparation);
      expect(result.people).toEqual(mockedNewRecipe.people);
      expect(result.time).toEqual(mockedNewRecipe.time);
      expect(result.notes).toEqual(mockedNewRecipe.notes);
      expect(result.tags).toEqual(mockedNewRecipe.tags);
      expect(result.type).toEqual(mockedNewRecipe.type);
    });

    it('should return error when recipe couldn\'t be created', async () => {
      const mockedNewRecipe = {
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
      createMock.mockRejectedValue(mockedError);

      try {
        await create(mockedNewRecipe);
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('getById', () => {
    const getMock = jest.fn();
    Recipe.find = getMock;

    it('should get a recipe', async () => {
      const recipes = [
        {
          _id: '1',
          name: 'recipe1',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
        {
          _id: '2',
          name: 'recipe2',
          image: 'mockedUrl',
          ingredients: ['Ingredient1', 'Ingredient2'],
          preparation: ['Preparation1', 'Preparation2'],
          people: 4,
          time: 240,
          notes: 'mockedNotes',
          tags: ['Tag1', 'Tag2'],
          type: ['Type1', 'Type2'],
        },
      ];

      getMock.mockResolvedValue(recipes[0]);

      const result = await getById('1');

      expect(result).toEqual(recipes[0]);
      expect(getMock).toHaveBeenCalledWith({ _id: '1' });
    });

    it('should return error when recipe couldn\'t be returned', async () => {
      const mockedError = new Error('Error getting recipe');
      getMock.mockRejectedValue(mockedError);

      try {
        await getById('1');
      } catch (e) {
        expect(e).toEqual(mockedError);
      }
    });
  });

  describe('update', () => {
    const updateMock = jest.fn();
    Recipe.findByIdAndUpdate = updateMock;

    it('should update a recipe', async () => {
      const updatedRecipeData = {
        _id: '1',
        name: 'Recipe 1 updated',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };
      const id = 'mockedId';
      const mockResult = { ...updatedRecipeData };
      updateMock.mockResolvedValue(mockResult);

      const result = await update(id, updatedRecipeData);

      expect(result).toEqual(mockResult);
      expect(updateMock).toHaveBeenCalledWith({ _id: id }, updatedRecipeData, {
        new: true,
      });
    });

    it('should return error when recipe couldn\'t be returned', async () => {
      const updatedRecipeData = {
        _id: '1',
        name: 'Recipe 1 updated',
        image: 'mockedUrl',
        ingredients: ['Ingredient1', 'Ingredient2'],
        preparation: ['Preparation1', 'Preparation2'],
        people: 4,
        time: 240,
        notes: 'mockedNotes',
        tags: ['Tag1', 'Tag2'],
        type: ['Type1', 'Type2'],
      };
      const id = 'mockedId';
      const mockError = new Error('Error updating recipe');
      updateMock.mockRejectedValue(mockError);

      try {
        await update(id, updatedRecipeData);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
      expect(updateMock).toHaveBeenCalledWith({ _id: id }, updatedRecipeData, {
        new: true,
      });
    });
  });

  describe('remove', () => {
    const deleteMock = jest.fn();
    Recipe.deleteOne = deleteMock;

    it('should delete a recipe', async () => {
      const id = 'mockedId';
      const mockResult = { deletedCount: 1 };
      deleteMock.mockResolvedValue(mockResult);

      const result = await remove(id);

      expect(result).toEqual(mockResult);
      expect(deleteMock).toHaveBeenCalledWith({ _id: id });
    });

    it('should return error when recipe couldn\'t be removed', async () => {
      const id = 'mockedId';
      const mockError = new Error('Error deleting recipe');
      deleteMock.mockRejectedValue(mockError);

      try {
        await remove(id);
      } catch (e) {
        expect(e).toEqual(mockError);
      }
      expect(deleteMock).toHaveBeenCalledWith({ _id: id });
    });
  });
});
