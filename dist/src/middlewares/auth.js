"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSwot = exports.validateAdmin = exports.validateAuthor = void 0;
const auth_1 = require("../utils/auth");
const errors_1 = require("../helpers/errors");
const author_service_1 = require("../components/author/author.service");
const admin_service_1 = require("../components/admin/admin.service");
const admin_service_2 = require("../components/admin/admin.service");
const validateAuthor = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("token not provided");
    }
    let id, role;
    try {
        ({ id, role } = yield (0, auth_1.verifyToken)(authorization));
        req.id = id;
        req.role = role;
        if (!req.id || !req.role) {
            throw new errors_1.authorizationError("Authorization Token is invalid or has expired");
        }
        const getAuthor = (0, author_service_1.findAuthor)(req.id);
        if (!getAuthor) {
            throw new errors_1.notFoundError("Author account not found");
        }
        if (req.role != "author") {
            throw new errors_1.authorizationError("You are not authorized");
        }
        return next();
    }
    catch (err) {
        throw new errors_1.authorizationError(`Invalid Token  ${err}`);
    }
});
exports.validateAuthor = validateAuthor;
const validateAdmin = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("Authorization Token is invalid or has expired");
    }
    let id, role;
    try {
        ({ id, role } = yield (0, auth_1.verifyToken)(authorization));
        req.id = id;
        req.role = role;
        if (!req.id || !req.role) {
            throw new errors_1.authorizationError("Authorization Token is invalid or has expired");
        }
        const findAdmin = (0, admin_service_1.getAdmin)(req.id);
        if (!findAdmin) {
            throw new errors_1.notFoundError("Admin account not found");
        }
        if (req.role != "author") {
            throw new errors_1.authorizationError("You are not authorized");
        }
        return next();
    }
    catch (err) {
        throw new errors_1.authorizationError(`Invalid Token  ${err}`);
    }
    return next();
});
exports.validateAdmin = validateAdmin;
const validateSwot = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new errors_1.authorizationError("Authorization Token is invalid or has expired");
    }
    let id, role;
    try {
        ({ id, role } = yield (0, auth_1.verifyToken)(authorization));
        req.id = id;
        req.role = role;
        if (!req.id || !req.role) {
            throw new errors_1.authorizationError("Authorization Token is invalid or has expired");
        }
        const findSwot = (0, admin_service_2.getSwot)(req.id);
        if (!findSwot) {
            throw new errors_1.notFoundError("User account not found");
        }
        if (req.role != "author") {
            throw new errors_1.authorizationError("You are not authorized");
        }
        return next();
    }
    catch (err) {
        throw new errors_1.authorizationError(`Invalid Token  ${err}`);
    }
});
exports.validateSwot = validateSwot;
