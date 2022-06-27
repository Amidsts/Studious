import express, { Request, Response, Router, RequestHandler} from "express" ;
// import { IRequest } from "../../helpers";
import * as books from "./books.controller"
const router = Router() ;



// router.post("/books/bulkupload", async (req:IRequest, res) => { 
//     const response = await books.addBulkBooks(req.body)
//     res.json(response)
// }) ;

export default router;