"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = exports.userController = exports.testController = void 0;
const postController_1 = require("./postController");
const testController_1 = require("./testController");
const userController_1 = require("./userController");
exports.testController = new testController_1.TestController();
exports.userController = new userController_1.UserController();
exports.postController = new postController_1.PostController();
