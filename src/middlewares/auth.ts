import { verifyToken  } from "../utils/auth";
import {authorizationError, notFoundError} from "../helpers/errors"
import { findAuthor } from "../components/author/author.service";
import { getAdmin } from "../components/admin/admin.service";
import { getSwot } from "../components/admin/admin.service";

import { NextFunction } from "express";

export const validateAuthor = async (
    req, _res, next: NextFunction
    ) => {
    
    const {authorization} = req.headers
    
    if (!authorization) {
        throw new authorizationError("token not provided")
    }

    let id: string, role: string
    try {

        ( {id, role} = await verifyToken(authorization) )

        req.id = id
        req.role = role

        if (!req.id || !req.role) {
            throw new authorizationError(
                "Authorization Token is invalid or has expired"
            )
        }
        const getAuthor = findAuthor(req.id)

        if ( !getAuthor ) {
            throw new notFoundError("Author account not found")
        }
        if ( req.role != "author") {
            throw new authorizationError(
                "You are not authorized"
            )
        }
        return next ()
    } catch (err) {
        throw new authorizationError(
            `Invalid Token  ${err}`
        )
    }
}



export const validateAdmin = async (req, _res, next: NextFunction) => {
    
    const {authorization} = req.headers

    if (!authorization) {
        throw new authorizationError(
            "Authorization Token is invalid or has expired"
        )
    }
    let id: string, role: string
    try {

        ( {id, role} = await verifyToken(authorization) )

        req.id = id
        req.role = role

        if (!req.id || !req.role) {
            throw new authorizationError(
                "Authorization Token is invalid or has expired"
            )
        }
        const findAdmin = getAdmin(req.id)

        if ( !findAdmin ) {
            throw new notFoundError("Admin account not found")
        }
        if ( req.role != "author") {
            throw new authorizationError(
                "You are not authorized"
            )
        }
        return next ()

    } catch (err) {
        throw new authorizationError(
            `Invalid Token  ${err}`
        )
    }

   return next()
}

export const validateSwot = async (req, _res, next: NextFunction) => {
    
    const {authorization} = req.headers

    if (!authorization) {
        throw new authorizationError(
            "Authorization Token is invalid or has expired"
        )
    }
    let id: string, role: string
    try {

        ( {id, role} = await verifyToken(authorization) )

        req.id = id
        req.role = role

        if (!req.id || !req.role) {
            throw new authorizationError(
                "Authorization Token is invalid or has expired"
            )
        }
        const findSwot = getSwot(req.id)

        if ( !findSwot ) {
            throw new notFoundError("User account not found")
        }
        if ( req.role != "author") {
            throw new authorizationError(
                "You are not authorized"
            )
        }
        return next ()

    } catch (err) {
        throw new authorizationError(
            `Invalid Token  ${err}`
        )
    }
}
