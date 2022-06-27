
// import { handleResponse } from "../../helpers/errors"
import { Admin } from "./admin.model"
// import {mailer} from "../../utils/email"

// import {response} from "express"

export const signUpAdmin = async(
    payload: { [ key : string ]: any }
) => {

    const adminExist = await Admin.findOne( { email: payload.email
    })

    if (adminExist) {
        // console.log(adminExist)
        return "there is an admin" 
    } 

    const newAdmin = await new Admin({
        ...payload
    }).save() 

    //send signUp mail
    // mailer(newAdmin.email)
    return newAdmin
}