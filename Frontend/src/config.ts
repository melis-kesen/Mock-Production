require('dotenv').config(); 

const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};

module.exports = config;
export{config};