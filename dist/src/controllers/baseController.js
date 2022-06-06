"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    jsonRes(doc, res) {
        res.status(200).json(doc);
    }
    simpleRes(res) {
        res.send("Express + TypeScript Server");
    }
    errRes(res, message = "Une erreur est survenue", status = 500) {
        res.status(status).json(message);
    }
}
exports.BaseController = BaseController;
