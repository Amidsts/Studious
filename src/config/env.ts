import * as dotenv from "dotenv" ;
dotenv.config() ;

const { env } = process

export const Url : string = env.mongoUrl || ""
export const port  = env.PORT || "6379"
export const CLOUDINARY_NAME = env.cloudinary_name || ""
export const CLOUDINARY_API_KEY = env.cloudinary_Api_Key || ""
export const CLOUDINARY_API_SECRET = env.cloudinary_Api_Secret || ""
export const PublicKey : string = env.JwtPublicKey || ""
export const PrivateKey : string = env.JwtPrivateKey || ""
// export const mailPassword : string = env.mailPassword || ""
// export const mailUrl : string = env.mail_Url || ""con