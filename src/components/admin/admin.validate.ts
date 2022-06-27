import { body } from "express-validator"

//regex to not allow white space in a string, it must be alphabet, and I ll change the first character to uppercase if it begins with lowercase
//  /[A-z]/ig
//regex to make sure a number starts with 0, not greaterthan or less than 11

const signUpValidate = () => {
    body("firstName").notEmpty().isAlpha().isString().matches(/^[A-Z]/),
    body("lastName").notEmpty().isAlpha().isString(),
    body("phone").notEmpty()
}