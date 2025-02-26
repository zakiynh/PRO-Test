const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });

    if (!user) {
      const error = new Error('User not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function authorize(roles = []) {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const error = new Error('Forbidden');
      error.name = 'UnauthorizedError';
      throw error;
    }

    next();
  };
}

module.exports = {
  authenticate,
  authorize
};