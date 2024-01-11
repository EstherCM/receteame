require('dotenv/config');
require('./config/db.config');

const express = require('express');
const mongoose = require('mongoose');
const createError = require('http-errors');
const recipeRouter = require('./routes/recipeRoutes');
import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status: number;
  errors?: string;
};

interface Data {
  errors?: string;
  message?: string;
};

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1', recipeRouter);

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500);

  const data: Data = {
    errors: undefined,
    message: undefined,
  };

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found');
  }

  data.message = error.message;

  res.status(error.status).json(data);
});

app.listen(port, () => {
  console.info(`🏃 App running in port: ${port}`);
});

export {};
