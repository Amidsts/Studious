import {
    authorizationError, conflictError, notFoundError,expectationFailedError, badRequestError
} from "../../helpers/errors"
import { Admin } from "./admin.model"
import adminAccess from "../authModel/auth.admin.model"
import {  
    signUpAdminValidate,
    signInAdminValidate,
    adminForgetPasswordValidate,
    adminForgetPasswordCodeValidate,
    adminresetPasswordValidate,
    adminchangePasswordValidate
} from "./admin.validate"
// import { date } from "joi"
import { checkHash, hashpassword } from "../../helpers/general"
import { generateToken } from "../../utils/auth"
import { generateVerificationCode } from "../../utils/general"
import { DEL, GET, SETEX } from "../../utils/redis"
import author from "../author/author.model"

export const signUpAdmin = async(
    payload: Record<string, string | number> 
) => {

    const {firstName, lastName, phone, email, password} = signUpAdminValidate(payload)

    const adminExist = await Admin.findOne( { email })

    if (adminExist) {
        throw new authorizationError( "admin already exists" )
    } 

    const newAdmin = await new Admin({
        firstName,
        lastName,
        phone,
        email,
        status: "active"
    }).save() 

    const hashedPassword = hashpassword( password )

     await new adminAccess({
        adminId: newAdmin._id,
        password:  hashedPassword,
        lastLoggedIn: (new Date()).toUTCString()
    }).save()

    //send signUp mail
    // mailer(newAdmin.email)
    return newAdmin
}

export const signInAdmin = async (payload: Record<string, string | number>) => {
    const { email, password } = signInAdminValidate(payload)

    const adminExists = await Admin.findOne({ email })

    if (!adminExists) {
        throw new authorizationError("invalid credential")
    }
    const adminSecret = await adminAccess.findOne({ adminId: adminExists._id})
    if ( !adminSecret) {
        throw new notFoundError("there is a problem try again")
    }
    const comparePassword = checkHash(password,adminSecret.password )

    if (!comparePassword) {
        throw new authorizationError("invalid credential")
    }

    //generateToken 
    const token = generateToken( {id:adminExists._id, Role:adminSecret.role } )

    await adminAccess.updateOne({
        lastLoggedIn : ( new Date() ).toUTCString()
    }) // update admin last logged in date

    return {
        adminExists,
        Token : token
    }
}

export const forgetPassword = async ( payload: Record<string, string | number> ) => {
    const { email } = adminForgetPasswordValidate(payload)

    const adminExists = await Admin.findOne({ email })
    if (!adminExists) {
        throw new authorizationError("invalid credential")
    }

    const Code = generateVerificationCode()
    await SETEX(`admin password resetCode is: ${Code}`, Code)
    return {
        code: Code
    }
}

//supply verificationCode
export const enterPasswordVerificationCode = async (payload: Record<string, string | number>) => {
    
    const {code} = adminForgetPasswordCodeValidate(payload)

    const getCode = await GET(`admin password resetCode is: ${code}`)

    if (!getCode) {
        throw new notFoundError("verification code is invalid or has expired")
    }
    return getCode
}

export const resendverifiCationCode = async () => {
    const Code = generateVerificationCode() 
    await SETEX(`admin password resetCode is: ${Code}`, Code)
    return Code
}

export const resetPassword = async ( payload: Record<string, string | number>, adminId ) => {
   const {code, newPassword, confirmPassword} = adminresetPasswordValidate(payload)

   if (newPassword !== confirmPassword) {
       throw new conflictError("password must be same")
   }
    const getAdmin = await Admin.findOne({_id: adminId})
    if (!getAdmin) {
        throw new notFoundError("there is a problem please try again")
    }

    const hashedPassword = hashpassword(confirmPassword)

    const resetpassword = await adminAccess.updateOne({adminId: adminId}, {password: hashedPassword})
    if (!resetpassword) {
        throw new expectationFailedError("unable to update password for some reason, pls try again")
    }

    DEL(`admin password resetCode is: ${code}`)

    return "password has been updated"
}

//protected route cont'd
//change password while online
export const changepassword = async ( payload: Record<string, string | number>, adminId ) => {

     //collect admin Id from jwtToken
   const adminSecret = await adminAccess.findOne({adminId: adminId})

   if (!adminSecret) {
       throw new authorizationError("you are not authorized")
   }
    const { oldPassword, newPassword, confirmPassword} = adminchangePasswordValidate(payload)

    // const oldPwdExist = await 
    const comparePassword = checkHash(oldPassword, adminSecret.password)
    
    if ( !comparePassword ) {
        throw new badRequestError("incorrect password")
    }

    if (newPassword !== confirmPassword) {
        throw new conflictError("new password and confirmPasswoord must be same")
    }

    const changedPwd = hashpassword(confirmPassword)
    await adminAccess.updateOne({adminId: adminId}, {password: changedPwd})
    return "password has been changed successfully"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAuthors = async (page: number, Limit:number, endIndex: number, next: { [key: string] : any }, prev: { [key: string] : any }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result : { [key: string] : any } = {} ;

    const authors =  await author.find().sort({_id: -1}).skip(page).limit(Limit).exec()

    if (page > 0 ) {
        result.previousPage = prev
    }
    if ( endIndex < await author.find().count() ) {
        result.nextPage = next
    }

    result.Authors = authors
    // let resul

    return {
        result
    }
}

export const getAuthor = async (authorId) => {
    const Author =  await author.findOne({_id: authorId})

    return Author
}

// const getSwots = async () => {
//     const authors =  await Swot.find().sort({_id: -1})

//     return authors
// }

// const getSwot = async (authorId) => {
//     const Author =  await author.findOne({_id: authorId})

//     return Author
// }

//admin get authors, get author , get swots, get swot

// 1) how to use eslint in nodejs, 2) how to use mongoose middleware 3)how does app.use and app.set() works in express