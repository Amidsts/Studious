import { Router , Request, Response} from "express"

import * as authorController from "./author.controller"
import { validateAuthor } from "../../helpers/auth";

const router = Router() ;

//unprotected APIs
router.post("/signUpAuthor", authorController.signUpAuthor) 
router.post("/signInAuthor", authorController.signInAuthor)

router.post("/forgotPassword", authorController.forgotPasswordEmail)
router.post("/enterPasswordVerificationCode", authorController.passwordVerificationCode)
router.post("/resendPasswordVerificationCode", authorController.resendPasswordVerificationCode)
router.post("/resetPassword/:authorId", authorController.resetpassword)

//protected APIs
router.post("/changePassword/:authorId", validateAuthor, authorController.changepassword)

router.post("/uploadBook/:authorid",authorController.addBook)

router.post("/:bookId/uploadImage", authorController.uploadImage)

router.post("/:authorId/bulkUpload", authorController.bulkBooksUpload)

export default router ;