const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

export const sequelize = new Sequelize(process.env.DB_CONNECTION);