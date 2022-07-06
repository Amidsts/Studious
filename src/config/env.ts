import * as dotenv from "dotenv" ;
dotenv.config() ;

const { env } = process

export const Url : string = env.mongoUrl || ""
export const port  = env.PORT || "6379" 
export const TOKEN : string = env.jwt_token || ""
export const CLOUDINARY_NAME = env.cloudinary_name || ""
export const CLOUDINARY_API_KEY = env.cloudinary_Api_Key || ""
export const CLOUDINARY_API_SECRET = env.cloudinary_Api_Secret || ""
// export const mailPassword : string = env.mailPassword || ""
// export const mailUrl : string = env.mail_Url || ""