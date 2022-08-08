/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt"

export const responseHandler = (payload: any, message = "success"): any => {
    return {
        success: true,
        message,
        data : payload || {}
    }
}

export const hashpassword = (plainPassword: string):string =>  {
    const salt = bcrypt.genSaltSync(10) ;
    return bcrypt.hashSync(plainPassword, salt)
}

export const checkHash = (plainPassword: string, hashedPassword: string) => {
   return bcrypt.compareSync( plainPassword, hashedPassword )
    
}

//generate 6 digit Code
export const generateVerificationCode = () => {

    const token = 100000 + ( Math.floor(Math.random() * 100000) )
    return token
}

