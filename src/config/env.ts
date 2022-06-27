import * as dotenv from "dotenv" ;
dotenv.config() ;

const { env } = process

export const Url : string = env.mongoUrl || ""
export const port : string = process.env.PORT || "2020" 
export const TOKEN : string = env.jwt_token || ""
// export const mailPassword : string = env.mailPassword || ""
// export const mailUrl : string = env.mail_Url || ""