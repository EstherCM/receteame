const { validCreateRecipeEvent } = require('../recipeMiddleware');
const createError = require('http-errors');

describe('[recipe middleware] unit test', () => {
  describe('validCreateRecipeEvent', () => {
    it('should return nothing if there are not errors', () => {
      const mockRequest = {
        body: {
          name: 'mockedName',
          ingredients: ['mockedIngredient'],
          preparation: ['mockedPreparation'],
        },
      };
      const mockResponse = {};
      const mockNext = jest.fn();

      validCreateRecipeEvent(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    const removePropertiesFromBody = <T extends keyof typeof mockRequest.body>(
      ...properties: T[]
    ) => {
      const { body, ...rest } = mockRequest;
      for (const prop of properties) {
        delete body[prop];
      }
      return { body, ...rest };
    };

    const mockRequest = {
      body: {
        name: 'mockedName',
        ingredients: ['mockedIngredient'],
        preparation: ['mockedPreparation'],
      },
    };

    it.each([
      [
        removePropertiesFromBody('name'),
        createError(400, 'Bad Request: Some properties are missing'),
      ],
      [
        removePropertiesFromBody('ingredients'),
        createError(400, 'Bad Request: Some properties are missing'),
      ],
      [
        removePropertiesFromBody('preparation'),
        createError(400, 'Bad Request: Some properties are missing'),
      ],
    ])(
      'should call next with specific error when %p',
      (mockRequest, expectedError) => {
        const mockResponse = {};
        const next = jest.fn();

        validCreateRecipeEvent(mockRequest, mockResponse, next);

        expect(next).toHaveBeenCalledWith(expectedError);
      },
    );
  });

  describe('dataSecurity', () => {
    // TODO se hará cuando se pueda crear, actualizar y eliminar
  });
});
