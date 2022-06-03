"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    isSuccess;
    isFailure;
    error;
    value;
    constructor(isSuccess, value, error) {
        if (isSuccess && error) {
            throw new Error('Successful result must not contain an error');
        }
        else if (!isSuccess && value) {
            throw new Error('Unsuccessful error must not contain a value');
        }
        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.value = value;
        this.error = error;
    }
    static ok(value) {
        return new Result(true, value, undefined);
    }
    static fail(error) {
        return new Result(false, undefined, error);
    }
    getError() {
        if (this.isSuccess) {
            throw new Error('Successful result does not contain an error');
        }
        return this.error;
    }
    getValue() {
        if (this.isFailure) {
            throw new Error('Unsuccessful result does not contain a value');
        }
        return this.value;
    }
}
exports.Result = Result;
