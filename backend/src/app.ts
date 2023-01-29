require('dotenv/config');
require('./config/db.config');
const router = require('./config/routes.config');
const express = require('express');
const logger = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

app.use('/api/v1', router);

app.listen(port, () => {
  console.info(`Aplicacion corriendo en el puerto ${port}`);
});

export {};