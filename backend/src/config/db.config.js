"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
mongoose.set("strictQuery", false);
mongoose.connect(connectionURI);
mongoose.connection.on('connected', () => {
    console.info('Connected');
});
mongoose.connection.on('disconnected', () => {
    console.info('Disconnected');
});
mongoose.connection.on('error', (err) => {
    console.error(`Error connecting, ${err}`);
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
