const user = require('../models/user.model');
const exercise = require('../models/exercise.model');

const path = process.cwd();

/**
 * Helper function - gets rid of unnecessary record properties
 *
 * @name simplify
 * @function
 * @param {object|object[]} record A Mongoose record or array of records
 * @returns {object|object[]} A simplified record or array of records
 */
const simplify = record => {
  const result = {};

  if (record.username) {
    result._id = record._id;
    result.username = record.username;
  }

  const simplifyExercises = exercises =>
    exercises.map(e => ({
      _id: e._id,
      date: e.date,
      description: e.description,
      duration: e.duration,
    }));

  if (record.exercises) {
    result.exercises = simplifyExercises(record.exercises);
  }

  // getExercises
  if (!record.username && !record.exercises) {
    return simplifyExercises(record);
  }

  return result;
};

/**
 * Home page handler - GET /
 *
 * @name root
 * @function
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.root = (req, res, next) => {
  res.status(200).sendFile(`${path}/views/index.html`);
};

/**
 * Get all users handler - GET /api/exercise/users
 * Returns array of all users with `username` and `_id` fields
 *
 * @name users
 * @function
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.users = async (req, res, next) => {
  try {
    const records = await user.get();
    const result = records.map(record => simplify(record));
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Get a user's exercise logs - GET /api/exercise/log
 * Sends user object with added array of exercises and total exercise count
 * Can also send part of the log of any user with optional parameters `from` and `to` or `limit`
 *
 * @name log
 * @function
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.log = async (req, res, next) => {
  const { query } = req;
  const {
    userId, to, from, limit,
  } = query;

  const gte = from ? Date.parse(from) : 0;
  const lt = to ? Date.parse(to) : Date.now();

  const options = {
    path: 'exercises',
    match: {
      date: {
        $gte: gte,
        $lt: lt,
      },
    },
  };

  if (limit) {
    options.options = { limit };
  }

  // Pass options to the virtual join in `populate`
  const record = await user.get(userId, options);

  const userObj = simplify(record);

  // Add a count of exercises
  userObj.count = userObj.exercises.length;
  res.status(200).send(userObj);
};

/**
 * Add new user - POST /api/exercise/new-user
 * Post form data username and send object with username and _id
 *
 * @name newUser
 * @function
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.newUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { username } = body;
    const record = await user.post(username);
    const userObj = simplify(record);
    res.status(200).send(userObj);
  } catch (err) {
    res.status(200).send(`There was a problem with your request: ${err}`);
  }
};

/**
 * Add an exercise to a user - POST /api/exercise/add
 * Posting form data user `id` (_id), `description`, `duration`, and optionally `date`.
 * If no date supplied, use current date.
 * Send user object with exercise fields added.
 *
 * @name exercise
 * @function
 * @param {Request} req Express Request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.exercise = async (req, res, next) => {
  const { body } = req;

  const record = await exercise.post(body);

  // Once the record has been added, return the new user object.
  // It should include the new exercise.
  if (record) {
    const updated = await user.get(body.userId);
    const userObj = simplify(updated);
    res.status(200).send(userObj);
  } else {
    res.status(200).send('There was a problem with your request...');
  }
};

// Not required - testing.
exports.getExercises = async (req, res, next) => {
  try {
    const records = await exercise.get();
    console.log(records);
    const result = simplify(records);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
  }
};
