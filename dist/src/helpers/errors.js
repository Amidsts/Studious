"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
// import {Response} from "express"
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectationFailedError = exports.requestTimeoutError = exports.conflictError = exports.badRequestError = exports.notFoundError = exports.authorizationError = void 0;
class baseError extends Error {
}
class authorizationError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "not_authourized",
            this.httpStatusCode = 401,
            this.errMessage = err,
            this.data = {};
    }
}
exports.authorizationError = authorizationError;
class notFoundError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "not_Found",
            this.httpStatusCode = 404,
            this.errMessage = err,
            this.data = {};
    }
}
exports.notFoundError = notFoundError;
class badRequestError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "bad_Request",
            this.httpStatusCode = 400,
            this.errMessage = err,
            this.data = {};
    }
}
exports.badRequestError = badRequestError;
class conflictError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "conflict",
            this.httpStatusCode = 409,
            this.errMessage = err,
            this.data = {};
    }
}
exports.conflictError = conflictError;
class requestTimeoutError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "conflict",
            this.httpStatusCode = 408,
            this.errMessage = err,
            this.data = {};
    }
}
exports.requestTimeoutError = requestTimeoutError;
class expectationFailedError extends baseError {
    constructor(err) {
        super();
        this.success = false,
            this.errorName = "expectation Failed",
            this.httpStatusCode = 417,
            this.errMessage = err,
            this.data = {};
    }
}
exports.expectationFailedError = expectationFailedError;
