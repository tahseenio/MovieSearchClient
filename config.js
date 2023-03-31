require('dotenv').config();

module.exports = {
  apikey: process.env.API_KEY,
  port: process.env.PORT || 3000,
};
