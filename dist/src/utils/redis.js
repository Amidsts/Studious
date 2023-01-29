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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXISTS = exports.DEL = exports.GET = exports.SETEX = exports.connectRedis = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// import * as ENV from "../config/env"
const redis = new ioredis_1.default();
const connectRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redis.on("connect", () => {
            console.log("'you are now connected to redis!");
        });
    }
    catch (err) {
        yield redis.on("error", (err) => {
            console.log(`Redis error!  ${err}`);
        });
    }
});
exports.connectRedis = connectRedis;
//set redis key with timeout in seconds, once timeout the key is deleted
const SETEX = (key, val) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('redis key set success')
        const c = yield redis.setex(key, 60 * 20, val);
        console.log(`see some works ${c}`);
        return c;
    }
    catch (err) {
        console.log(`redis err here ${err}`);
    }
});
exports.SETEX = SETEX;
//get redis key
const GET = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('redis key retrieved!')
        return yield redis.get(key);
    }
    catch (err) {
        console.log(`redis key failed to set error here ${err}`);
    }
});
exports.GET = GET;
//delete redis key
const DEL = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('redis key retrieved!')
        const g = yield redis.del(key);
        console.log(g);
        return g;
    }
    catch (err) {
        console.log(`redis key has been deleted! ${err}`);
    }
});
exports.DEL = DEL;
//check if key exist in redis
const EXISTS = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('redis key retrieved!')
        const g = yield redis.exists(key);
        console.log(g);
        return g;
    }
    catch (err) {
        console.log(`redis key has been deleted! ${err}`);
    }
});
exports.EXISTS = EXISTS;
//
