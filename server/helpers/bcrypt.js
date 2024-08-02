const bcrypt = require("bcryptjs");

const hashPasssword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePasssword = (password, hashPasssword) => {
  return bcrypt.compareSync(password, hashPasssword);
};

module.exports = { hashPasssword, comparePasssword };
