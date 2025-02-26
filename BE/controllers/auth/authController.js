const { User } = require("../../models");
const { hashPassword, comparePassword } = require("../../helpers/bcrypt");
const { generateToken } = require("../../helpers/jwt");
const moment = require("moment");

async function register(req, res, next) {
  try {
    const { fullName, dob, gender, email, password, registDate, role } = req.body;
    const formattedDob = moment(dob, "DD-MM-YYYY").format("YYYY-MM-DD");

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      fullName,
      dob: formattedDob,
      gender,
      email,
      password: hashedPassword,
      registDate,
      role
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      dob: newUser.dob,
      gender: newUser.gender
    };

    const token = generateToken(payload);

    res.status(201).json({
      message: "User created",
      data: {
        token,
        role: newUser.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.name = "UnauthorizedError";
      throw error;
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      const error = new Error("Invalid email or password");
      error.name = "UnauthorizedError";
      throw error;
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      dob: user.dob,
      gender: user.gender,
    };

    const token = generateToken(payload);

    res.status(200).json({
      message: "Login success",
      data: {
        token,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout success"
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  logout
}