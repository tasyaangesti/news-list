if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const UserController = require("./controller/userController");
const Controller = require("./controller/controller");
const app = express();
const port = process.env.SERVER_PORT;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const router = express.Router();

app.post("/register", UserController.registerUser);
app.post("/login", UserController.login);
app.get("/home", Controller.getAllData);
app.get("/article/:id", Controller.getDataById);
app.get("/profile/:id", Controller.getDetailUser);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
