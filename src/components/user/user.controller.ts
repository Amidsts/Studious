// import User, {IUser} from "./user.model" ;
// import { generateVerificationCode } from "../../utils/general"
// import {mailer} from "../../utils/email"
// //create user with the verication code added to database
// export const createUser = async (
//     {
//         firstName, lastName, phone, email, password
//     }: IUser
// ) => {
//         // const emailExist = await User.findOne({email})
//         // if (emailExist) {
//         // return console.log("user Already exist")
//         // }
//         const newUser = new User(
//             {
//                 firstName,
//                 lastName,
//                 phone,
//                 email, 
//                 password,
//                 verificationCode: await generateVerificationCode()  
//             }
//         )
//         console.log(newUser.firstName)
//         await newUser.save() ;

//         //send verification code to user email
//          mailer( newUser.email, newUser.firstName, newUser.verificationCode )
//         console.log("verification code sent! check your email")

//         return newUser ;

//     }

// // login user
// export const loginUser = async (email:string, password:string) => {
//     const user = await User.findOne({email}).select("-password").exec() ;
//     if (!user) {
//         return console.log("invalid email or password")
//     }
//     if (user.status != "Active") {
//         return console.log("account is inactive or suspended")
//     }
//     const passwordlExist = user.password
//     if (!passwordlExist) {
//         return console.log("invalid email or password")
//     }

//     return user ;

// }