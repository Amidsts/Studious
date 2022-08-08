import {Router} from "express" 

import * as SwotController from "./swot.controller"
import { validateSwot } from "../../middlewares/auth";
import { pagination } from "../../middlewares/pagination";

const router = Router() ;

//add new Swot

router.post("/signUpSwot", SwotController.signupSwot)
router.post("/signInSwot", SwotController.signinSwot)
router.post("/forgetPassword", SwotController.forgetpasswrd)
router.post("/VerificationCode", SwotController.enterverificationCode)
router.post("/resendVerificationCode", SwotController.resendPasswrdverificationCode)
router.post("/resetPassword/:SwotId", SwotController.resetpassword) 

router.post("/changePassword/:SwotId", validateSwot, SwotController.changePassword)
router.get("/Books", validateSwot, pagination, SwotController.getbooks)
router.get("/Book", validateSwot,  SwotController.getbook)
router.get("/Books/:Category", validateSwot, pagination, SwotController.getbooksBycategory)


export default router