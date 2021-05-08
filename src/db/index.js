const mongoose = require('mongoose');
require('dotenv').config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
  console.log('Something went wrong with connection to database');
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Database disconnected');
});

process.on('SIGINT', async () => {
  mongoose.connection.close(() => {
    console.log('Your app was disconnected from database');
    process.exit(1);
  });
});

module.exports = db;