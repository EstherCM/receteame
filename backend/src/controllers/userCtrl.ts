import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { User } from '../database/models/userModel';

module.exports.getUser = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const criterial = {
    _id: id || '',
  };

  User.find(criterial)
    .then((user: any) => {
      if (user.length) {
        res.status(200).json(user);
      } else {
        next(createError(404, "The user doesn't exists"));
      }
    })
    .catch((error: Error) => {
      console.error(`🔥 Error in getUser ${error}`);
      next(error);
    });
};
