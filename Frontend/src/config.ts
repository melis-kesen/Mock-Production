require('dotenv').config(); 

const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3001
};

module.exports = config;
export{config};