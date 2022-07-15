import jwt from "jsonwebtoken"
import * as ENV from "../config/env"

//generate random secret using crypto
export const generateToken = (payload: { [key : string] : any }) => {
   return jwt.sign(payload, ENV.TOKEN, {expiresIn: 20000})
}

export const verifyToken = (authorization: string) => {
const [, token] = authorization.split("Bearer ")

return jwt.verify(token, ENV.TOKEN)

}