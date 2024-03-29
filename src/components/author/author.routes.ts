import { Router } from "express"

import * as authorController from "./author.controller"
import { validateAuthor } from "../../middlewares/auth";
import { pagination } from "../../middlewares/pagination";

const router = Router() ;

//unprotected APIs
router.post("/signUpAuthor", authorController.signUpAuthor) 
router.post("/signInAuthor", authorController.signInAuthor)

router.post("/forgotPassword", authorController.forgotPasswordEmail)
router.post("/enterPasswordVerificationCode", authorController.passwordVerificationCode)
router.get("/resendPasswordVerificationCode", authorController.resendPasswordVerificationCode)
router.post("/resetPassword", authorController.resetpassword)


//protected APIs
router.post("/changePassword/:authorId", validateAuthor, authorController.changepassword)

router.post("/uploadBook/:authorid",validateAuthor, authorController.addBook)

router.post( "/:bookId/uploadImage", authorController.uploadImage )
router.post("/:authorId/bulkUpload", authorController.bulkBooksUpload) 
 
router.get("/books",validateAuthor, pagination, authorController.getBooks)

router.get("/author/:authorId", authorController.getauthor)
 
export default router ;