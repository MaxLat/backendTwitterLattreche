"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = exports.userController = void 0;
const postController_1 = require("./postController");
const userController_1 = require("./userController");
exports.userController = new userController_1.UserController();
exports.postController = new postController_1.PostController();
