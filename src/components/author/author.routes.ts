import { Router } from "express"

import * as authorController from "./author.controller"

const router = Router() ;

router.post("/signUpAuthor", authorController.signUpAuthor)
router.post("/signInAuthor", authorController.signInAuthor)
export default router ;