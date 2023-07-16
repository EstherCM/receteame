"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createError = require('http-errors');
const { User } = require('../model');
module.exports.getUsers = (req, res, next) => {
    User
        .find()
        .then((users) => {
        res.status(200).json(users);
    })
        .catch((error) => {
        console.error(`🔥 Error in getUsers ${error}`);
        next(error);
    });
};
module.exports.getUser = (req, res, next) => {
    const { id } = req.params;
    const criterial = {
        _id: id || '',
    };
    User
        .find(criterial)
        .then((user) => {
        if (user.length) {
            res.status(200).json(user);
        }
        else {
            next(createError(404, 'The user doesn\'t exists'));
        }
    })
        .catch((error) => {
        console.error(`🔥 Error in getUser ${error}`);
        next(error);
    });
};
