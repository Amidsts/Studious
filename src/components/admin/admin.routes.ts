import {Router, Request, response} from "express" 

import * as adminController from "./admin.controller"

const router = Router() ;

//add new admin

router.post("/signUpAdmin", adminController.signUpAdmin)

export default router