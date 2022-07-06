import { Router , Request, Response} from "express"

import * as authorController from "./author.controller"

const router = Router() ;

router.post("/signUpAuthor", authorController.signUpAuthor) 
router.post("/signInAuthor", authorController.signInAuthor)
router.post("/fp", authorController.forgotPasswordEmail)
router.post("/cde", authorController.passwordVerificationCode)
router.post("/upload", authorController.uploadImage)

export default router ;