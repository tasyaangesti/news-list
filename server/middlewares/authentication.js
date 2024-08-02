const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let token = req.headers.authorization;
    console.log(token, ">> token dari authen");

    if (!token) {
      console.log("masuk 1");

      throw { message: "Invalid Token" };
    }

    if (token.slice(0, 7) !== "Bearer") {
      console.log("masuk 2");
      throw { message: "Invalid Token" };
    }

    token = token.slice(7);

    let payload = verifyToken(token);
    let user = await user.findByPk(payload.id);
    if (!user) {
      throw { message: "Invalid Token" };
    }

    req.user = {
      id: user.id,
    };
  } catch (error) {
    console.log(error);
    if (error.name === "InvalidToken" || error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json(error);
  }
}
