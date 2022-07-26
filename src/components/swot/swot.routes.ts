import {Router, Request, response} from "express" 

import * as adminController from "./swot.controller"
import { validateAdmin } from "../../middlewares/auth";
import { pagination } from "../../middlewares/pagination";

const router = Router() ;

//add new admin

router.post("/signUpAdmin", adminController.signupAdmin)
router.post("/signInAdmin", adminController.signinAdmin)
router.post("/forgetPassword", adminController.forgetpasswrd)
router.post("/VerificationCode", adminController.enterverificationCode)
router.post("/resendVerificationCode", adminController.resendPasswrdverificationCode)
router.post("/resetPassword/:adminId", adminController.resetpassword) 

router.post("/changePassword/:adminId", validateAdmin, adminController.changePassword)
router.get("/Authors", validateAdmin, pagination, adminController.getAuthors)
router.get("/author", validateAdmin,  adminController.getauthor)


export default router