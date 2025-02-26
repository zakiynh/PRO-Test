function errorHandler(err, req, res, next) {
  console.error(err.stack);

  let statusCode;
  let message;

  switch (err.name) {
    case 'SequelizeValidationError':
      statusCode = 400;
      message = err.errors.map(e => e.message).join(', ');
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 400;
      message = 'Duplicate entry';
      break;
    case 'NotFoundError':
      statusCode = 404;
      message = 'Data not found';
      break;
    case 'UnauthorizedError':
      statusCode = 401;
      message = err.message;
      break;
    default:
      statusCode = 500;
      message = 'Internal server error';
  }

  res.status(statusCode).json({
    message: message
  });
}

module.exports = errorHandler;