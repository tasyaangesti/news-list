const { Article } = require("../models");

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
}

module.exports = Controller;
