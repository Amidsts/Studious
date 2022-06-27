import express from "express" ;
// import { env } from "./utils/env"
import {connectDb} from "./config/db" ;
import adminRoutes from "./components/admin/admin.routes"
import authorRoutes from "./components/author/author.routes"
// import userRoutes from "./components/user/user.routes"
import bookRoutes from "./components/books/books.routes"
import * as ENV from "./config/env"

const main = async () => {
    const app = express() ;
    app.use(express.json());
    app.use(express.urlencoded({extended: true})) ;

    // const err = new Error()
    // console.log(err)
    //connect to database
    connectDb(); 
     

    app.use("/v1/admin", adminRoutes)
    app.use("/v1/author", authorRoutes)
    app.use("/v1/Books", bookRoutes)
    
    app.listen(ENV.port, () => {
        console.log(`server is up and running on ${ENV.port}`)
    })  
}
 
main().catch ((err) => {
    console.log(err.messsage)
}) ; 