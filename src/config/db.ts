/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {connect} from "mongoose" ;
import * as ENV from "../config/env" ;


export const connectDb = async () => {
    try{ 
        const option = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true, // Don't build indexed
            //maxPoolSize: 10, // Maintain up to 10 socket connections
            //serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            //socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        }
       const db = await connect( ENV.Url!, option) ;
        console.log("connected to database successfully")

        return db
    } catch (error: any) {
        console.log(error.message)
    }
}