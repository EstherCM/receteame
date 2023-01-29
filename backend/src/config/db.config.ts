const mongoose = require('mongoose');
const connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

mongoose.connect(connectionURI);

mongoose.connection.on('connected', () => {
  console.info('Connected');
});

mongoose.connection.on('disconnected', () => {
  console.info('Disconnected');
});

mongoose.connection.on('error', (err: Error) => {
  console.error(`Error connecting, ${err}`);
});

export {};