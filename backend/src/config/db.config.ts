const mongoose = require('mongoose');
const connectionURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/receteame';
mongoose.set('strictQuery', false);

mongoose.connect(connectionURI);

mongoose.connection.on('connected', () => {
  console.info('🔌 Connected to mongodb');
});

mongoose.connection.on('disconnected', () => {
  console.info('😴 Disconnected to mongodb');
});

mongoose.connection.on('error', (err: Error) => {
  console.error(`Error connecting, ${err}`);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export {};
