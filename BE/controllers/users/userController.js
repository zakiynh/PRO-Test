const { User } = require("../../models");
const moment = require("moment");
const searchCondition = require("../../utils/searchCondition");
const getPagination = require("../../utils/pagination");
const { Op } = require("sequelize");

async function getAllUsers(req, res, next) {
  try {
    const condition = searchCondition(req.query);
    const { limit, offset, page } = getPagination(req.query);

    condition.id = { [Op.ne]: req.user.id };

    const { rows: users, count } = await User.findAndCountAll({
      where: condition,
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      limit,
      offset
    });

    res.status(200).json({
      data: users,
      pagination: {
        page,
        limit,
        total: count
      }
    });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
    });
    if (!user) {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    }
    await user.destroy();
    res.status(200).json({
      message: "User deleted"
    });
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      const error = new Error("User not found");
      error.name = "NotFoundError";
      throw error;
    }
    const { email, role, dob, fullName, gender } = req.body;

    if (email) user.email = email;
    if (dob) user.dob = moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD');
    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (role) user.role = role;

    await user.save();
    res.status(200).json({
      message: "User updated"
    });
  } catch (error) {
    next(error);
  }
}

async function getProfile(req, res, next) {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getProfile
}