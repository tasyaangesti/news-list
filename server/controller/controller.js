const { Article, User } = require("../models");

class Controller {
  static async getAllData(req, res) {
    try {
      const news = await Article.findAll();

      res.status(200).json(news);
    } catch (error) {
      console.log(error);
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getDataById(req, res) {
    try {
      const { id } = req.params;
      const findNews = await Article.findByPk(id);
      if (!findNews) {
        throw { code: 404, message: "data not found" };
      }

      res.status(200).json(findNews);
    } catch (error) {
      console.log(error);
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getDetailUser(req, res) {
    try {
      const { id } = req.params;
      const findUser = await User.findByPk(id);
      if (!findUser) {
        throw { code: 404, message: "data not found" };
      }

      res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      if (error.hasOwnProperty("code")) {
        res.status(error.code).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = Controller;
