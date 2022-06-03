"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const baseController_1 = require("./baseController");
class AuthController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    createUser(req, res) {
        // Add some conditional logic...
        //const jane = User.build
        this.simpleRes(res);
    }
}
exports.AuthController = AuthController;
