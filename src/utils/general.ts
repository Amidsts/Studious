import { badRequestError } from "../helpers/errors";

export const generateVerificationCode = async () => {
    const characters = "0123456789abcdefghijklmnoprstuvwxyz" 

    let verificationCode = "" ;

    for (let i = 0; i < characters.length; i++) {
        const code =  characters[Math.floor(Math.random() * characters.length)] ;
        verificationCode += code ;
    }
    console.log(`verification code is ${verificationCode}`)
} 


export const validator = ( schema: { [key: string] : any }, inputObject: { [key: string] : any } ) => {
    const validation = schema.validate(inputObject)
 
    const {error, value} = validation
 
    if (error) {
        throw new badRequestError(error)
    }
    return value ;
 }