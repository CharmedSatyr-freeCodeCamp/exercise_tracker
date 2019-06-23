module.exports = (req, res, next) => {
  const status = 404;
  const error = { error: 'Resource not found' };
  res.status(status).json(error);
};
