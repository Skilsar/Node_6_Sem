const users = require("./users");

const checkPassword = (password1, password2) => {
  return password1 === password2;
};

const checkUser = (login) => {
  return users.find((e) => {
    return e.login === login;
  }); 
};

module.exports = {
  checkUser,
  checkPassword,
};
