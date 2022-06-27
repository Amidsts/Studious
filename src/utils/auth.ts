import jwt from "jsonwebtoken"
import * as ENV from "../config/env"

export const generateToken = (payload: { [key : string] : any }) => {
   return jwt.sign(payload, ENV.TOKEN, {expiresIn: 20000})
}