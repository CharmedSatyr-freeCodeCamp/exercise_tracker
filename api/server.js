// Path
const path = process.cwd();

// 3rd party resources
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

// Middleware
const error = require('./middleware/500');
const missing = require('./middleware/404');
const router = require('./routes/routes');

// Prepare the Express app
const app = express();

// App level middleware
app.use(cors());
app.use(morgan('dev'));

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static resources
app.use(express.static(`${path}/public`));

// API Router
app.use(router);

// Catchalls
app.use('*', missing);
app.use(error);

/**
 * Exported function to start the Express server
 *
 * @name start
 * @function
 * @param {string|number} PORT Port used for the server
 */
const start = PORT => {
  const listener = app.listen(PORT, () => {
    console.log(`Listening on port ${listener.address().port}`);
  });
};

module.exports = start;
