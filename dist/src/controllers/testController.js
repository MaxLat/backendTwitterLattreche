"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const baseController_1 = require("./baseController");
class TestController extends baseController_1.BaseController {
    constructor() {
        super();
    }
    createFunction(req, res) {
        // Add some conditional logic...
        this.simpleRes(res);
    }
}
exports.TestController = TestController;
