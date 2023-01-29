require('dotenv/config');
require('./config/db.config');
const router = require('./config/routes.config');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use('/api/v1', router);

app.use((error: any, req: any, res: any, next: any) => {
  res.status(error.status || 500);
  console.log(error);

  const data = {
    errors: undefined,
    message: undefined
  };

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Recurso no encontrado");
  }

  data.message = error.message;
  res.status(error.status);
  res.json(data);
})

app.listen(port, () => {
  console.info(`Aplicacion corriendo en el puerto ${port}`);
});

export {};