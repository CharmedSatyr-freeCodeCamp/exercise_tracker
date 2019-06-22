/**
 * Home page handler
 *
 * @name root
 * @function
 * @param {Request} req Express request object
 * @param {Response} res Express Response object
 * @param {NextFunction} next Express Next middleware
 */
exports.root = (req, res, next) => {
  res.status(200).send('OK');
};

exports.newUser = (req, res, next) => {
  // Post form data username
  // Return object with username and _id
  const { body } = req;
  res.status(200).send('POSTED', body);
};

exports.users = (req, res, next) => {
  // Returns array of all users with usernames and _id
  res.status(200).send('ALL THE USERS');
};

exports.exercise = (req, res, next) => {
  // posting form data userId (_id), description, duration, and optionally date
  // If no date supplied, use current date
  // Return user object with exercise fields added
  const { body } = req;
  res.status(200).send(`New Exercizzzzzzzzzzzzz: ${body}`);
};

exports.log = (req, res, next) => {
  const { params } = req;
  // Sends user object with added array log and total exercise count
  // Can also send part of the log of any user with optional parameters "from and to" or "limit"
  // (Date format yyyy-mm-dd, limit = int)
  res.status(200).send(`Deez params: ${params}`);
};
