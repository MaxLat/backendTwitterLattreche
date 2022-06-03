"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoError = void 0;
class RepoError extends Error {
    code;
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
exports.RepoError = RepoError;
