const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.join(__dirname, "../.env"),
});

module.exports = {
  PORT: process.env.PORT,
  GOOGLE_APP_ID: process.env.GOOGLE_APP_ID,
  GOOGLE_APP_SECRET: process.env.GOOGLE_APP_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
};
