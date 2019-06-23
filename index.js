// 3rd party resources
require('dotenv').config();
const mongoose = require('mongoose');

// Import the API server's `start` method
const start = require('./api/server');

// Start the database server with options
mongoose.set('debug', true);

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

const DB_NAME = 'exercise_tracker';
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${DB_NAME}`;

mongoose.connect(MONGODB_URI, options, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Mongoose connected...');
  }
});

// Start the API server
const PORT = process.env.PORT || 3000;
start(PORT);
