import { badRequestError } from "../helpers/errors";

export const generateVerificationCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnoprstuvwxyz" 

    let verificationCode = "" ;

    for (let i = 0; i < 6; i++) {
        const code =  characters[Math.floor(Math.random() * characters.length)] ;
        verificationCode += code ;
    }
    console.log(`verification code is ${verificationCode}`)
    return verificationCode
} 


export const validator = ( schema: { [key: string] : any }, inputObject: { [key: string] : any } ) => {
    const validation = schema.validate(inputObject)
 
    const {error, value} = validation
 
    if (error) {
        console.log(error)
        throw new badRequestError(` ${value} ${error.message}`)
    }
    
    return value ;
 }