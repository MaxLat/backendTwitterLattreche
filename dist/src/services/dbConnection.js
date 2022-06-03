"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const { Sequelize } = require('sequelize');
//export const sequelize = new Sequelize('mysql://sql11495465:58R7lyRMvS@sql11.freemysqlhosting.net:3306/sql11495465');
exports.sequelize = new Sequelize('mysql://root:root@localhost:8889/twitter');
