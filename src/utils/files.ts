import {Request} from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import path from "path"
import fileUpload  from "express-fileupload";




// const {GridFsStorage} = require('multer-gridfs-storage');
// import csv from "csvtojson"
// import Grid from "gridfs-stream"
// import fs from "fs"

// dotenv.config()
//  const mongourl = process.env.mongoUrl

// var conn = mongoose.createConnection(mongourl);

// conn.once('open', function () {
//   let gfs = Grid(conn.db, mongoose.mongo);
//  gfs.collection("uploads") // collection name
//   // all set!
// })


// //create storage engine
// let storage = new GridFsStorage({
//     url: mongourl,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           console.log(buf.toString("hex"))
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     }
//   });
//   export const upload = multer({ storage });

// const csvFilePath = ""


// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */ 
// })