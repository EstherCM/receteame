const createError = require('http-errors');
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../model/user.model';

module.exports.getUsers = (req: Request, res: Response, next: NextFunction) => {
  User
    .find()
    .then((users: IUser[]) => {
      res.status(200).json(users);
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getUsers ${error}`);
      next(error);
    })
};

module.exports.getUser = (req: Request, res: Response, next: NextFunction) => {
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
    });
};
