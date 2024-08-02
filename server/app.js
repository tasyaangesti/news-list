if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const UserController = require("./controller/userController");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const router = express.Router();

app.post("/register", UserController.registerUser);
app.post("/login", UserController.login);

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
