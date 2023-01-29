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
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = __importDefault(require("path"));
const admin_routes_1 = __importDefault(require("./components/admin/admin.routes"));
const author_routes_1 = __importDefault(require("./components/author/author.routes"));
// import userRoutes from "./components/user/user.routes"
const books_routes_1 = __importDefault(require("./components/books/books.routes"));
const payment_routes_1 = __importDefault(require("./components/payment/payment.routes"));
const env_1 = require("./config/env");
const cloudinary_config_1 = require("./config/cloudinary.config");
const redis_1 = require("./utils/redis");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json())
        .use(express_1.default.urlencoded({ extended: true }))
        .use((0, express_fileupload_1.default)({
        limits: { fileSize: 50 * 1024 * 1024 },
        abortOnLimit: true,
        // createParentPath: true
        useTempFiles: true,
        tempFileDir: path_1.default.join(__dirname, "./upload"),
    }))
        .use(express_1.default.static("public"));
    app.use("*", cloudinary_config_1.cloudCloudinary);
    // const myurl = 'mongodb://localhost:27017';
    // MongoClient.connect(myurl, (err, client) => {
    //   if (err) return console.log(err)
    //   let db = client.db('test') 
    // })
    //connect redis
    (0, redis_1.connectRedis)();
    //connect to database
    // connectDb(); 
    // const oneDay = 1000 * 60 * 60 * 24;
    // app.use( session({
    //     secret: 'unvsjnkljsbcnieugu3ty78047',
    //     resave: false,
    //     saveUninitialized: true,
    //     cookie: { secure: true, maxAge: oneDay }
    // }) )
    app.use("/v1/admin", admin_routes_1.default)
        .use("/v1/author", author_routes_1.default)
        .use("/v1/Books", books_routes_1.default)
        .use("/v1/Payment", payment_routes_1.default);
    app.get("/form", (req, res) => {
        res.status(200).sendFile(path_1.default.resolve(__dirname, "public/index.html"));
    });
    app.listen(env_1.port, () => {
        console.log(`server is up and running on ${env_1.port}`);
    });
});
main().catch((err) => {
    console.log(err.messsage);
});
