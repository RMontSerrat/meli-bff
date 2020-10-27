/* eslint-disable max-classes-per-file */

class ExtendableError extends Error {
  constructor({
    message, errors, status, stack,
  }) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.stack = stack;
  }
}

class APIError extends ExtendableError {
  constructor({
    message,
    errors,
    stack,
    status = 500,
  }) {
    super({
      message, errors, status, stack,
    });
  }
}

module.exports = APIError;
