module.exports = (err, req, res, next) => {
  console.log('__SERVER_ERROR__', err);
  const status = 500;
  const message = err.message || err;
  res.status(status).send(message);
};
