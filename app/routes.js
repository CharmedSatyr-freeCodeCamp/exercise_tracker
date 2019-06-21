const express = require('express');

const { controllers } = require('./controllers');

const router = express.Router();

router.get('/', controllers.root);
router.get('/api/exercise/users', controllers.users);
router.get('/api/exercise/log/:id', controllers.log);
router.post('/api/exercise/new-user', controllers.newUser);
router.post('/api/exercise/add', controllers.exercise);

module.exports = { router };
