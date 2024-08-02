const { where } = require("sequelize");
const { User } = require("../models");
const { comparePasssword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

class UserController {
  static async registerUser(req, res) {
    try {
      const { firstName, lastName, phoneNumber, email, password } = req.body;
      const newUser = await User.create({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });

      res.status(200).json({
        id: newUser.id,
        name: newUser.firstName + " " + newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      });
    } catch (error) {
      console.log(error);
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error.name === "SequelizeValidationError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { code: 400, message: "Invalid email" };
      }

      if (!password) {
        throw { code: 400, message: "Invalid password" };
      }

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { code: 401, message: "invalid email or password" };
      }

      const isPasswordSame = comparePasssword(password, findUser.password);
      if (!isPasswordSame) {
        throw { code: 401, message: "invalid password" };
      }

      const access_token = signToken({ id: User.id });
      res.status(200).json({ email, access_token: access_token });
    } catch (error) {
      console.log(error, ">> error");
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "internal server error" });
      }
    }
  }
}

module.exports = UserController;
