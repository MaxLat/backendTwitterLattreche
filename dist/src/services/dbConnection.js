"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
exports.sequelize = new Sequelize(process.env.DB_CONNECTION, {
    dialect: 'mysql'
});
