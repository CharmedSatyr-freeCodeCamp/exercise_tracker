require('dotenv').config();

const express = require('express');

const app = express();

const { error } = require('./middleware/500');
const { missing } = require('./middleware/404');
const { router } = require('./routes/routes');

app.use(router);
app.use('*', missing);
app.use(error);

const start = PORT =>
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });

module.exports = { start };
