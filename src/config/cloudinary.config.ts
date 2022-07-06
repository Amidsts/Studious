import cloudinary,{v2} from "cloudinary" 
import { Request, Response, NextFunction } from "express"

import * as ENV from "./env"

export const cloudCloudinary = (req: Request, res: Response, next: NextFunction) => {
       v2.config({
            cloud_name: ENV.CLOUDINARY_NAME,
            api_key: ENV.CLOUDINARY_API_KEY,
            api_secret: ENV.CLOUDINARY_API_SECRET,
        })
        next()
}

export const uploader = v2.uploader