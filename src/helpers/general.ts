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

export const checkHash = (plainPassword, hashPassword) => {
    bcrypt.compareSync( plainPassword, hashPassword )
    return "Success"
}