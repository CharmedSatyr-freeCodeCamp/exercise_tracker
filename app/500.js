const error = (err, req, res, next) => {
  const status = 500;
  const message = err.message || '__SERVER ERROR__';
  res.status(status).send(message);
};

module.exports = { error };
