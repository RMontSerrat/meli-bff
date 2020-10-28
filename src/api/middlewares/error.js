const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const logger = require('../../config/logger');
const { env } = require('../../config/vars');
const APIError = require('../utils/APIError');

const handler = (err, req, res, next) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

const converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }

  logger.error(err);

  return handler(convertedError, req, res);
};

const notFound = (req, res, next) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });

  logger.error(err);

  return handler(err, req, res);
};

module.exports = {
  handler,
  converter,
  notFound,
};
