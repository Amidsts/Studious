/* eslint-disable @typescript-eslint/no-explicit-any */

import {verify, sign, SignOptions} from "jsonwebtoken"
import * as ENV from "../config/env"

//generate random secret using crypto
export const generateToken = (payload: { [key : string] : any }) => {
   const signOptions:SignOptions ={
      expiresIn: 20000
   }
   return sign(payload, ENV.PrivateKey, signOptions)
}

interface TokenPayload {
   id: string;
   status: string;
   role: string
}

export function verifyToken(authorization: string): Promise<TokenPayload> {
const [, token] = authorization.split("Bearer ")

// const VerifyOptions: VerifyOptions = {
//    algorithms: ['RS256']
// }  

return new Promise ( (resolve, reject) => {

   verify(token, ENV.PrivateKey, (error, decodedToken: TokenPayload) => {

      if (error) return reject( error )
      
      return resolve( decodedToken )
   } )
} )

}

