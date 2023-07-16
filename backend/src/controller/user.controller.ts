const createError = require('http-errors');
const { User } = require('../model');

module.exports.getUsers = (req: any, res: any, next: any) => {
  User
    .find()
    .then((users: any) => {
      res.status(200).json(users);
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getUsers ${error}`);
      next(error);
    })
};

module.exports.getUser = (req: any, res: any, next: any) => {
  const { id } = req.params;

  const criterial = {
    _id: id || '',
  };
  
  User
    .find(criterial)
    .then((user: any) => {
      if (user.length) {
        res.status(200).json(user);
      } else {
        next(createError(404, 'The user doesn\'t exists'));
      }
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getUser ${error}`);
      next(error);
    })
};

export {};