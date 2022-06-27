import {Request} from "express"

export type statusType = "active" | "inactive" | "submitted" ;

export interface IRequest extends Request {
    booktitle: string,
    bookauthor: string
}

//admin
//ENUMS
export enum adminstatusENUM {
    ACTIVE ="active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    DISABLED = "disabled"
} 

//books
export enum bookStatusENUM {
    AVAILABLE ='available',
    SOLD_OUT = 'soldOut'
}

// UNION TYPES
export type roleTYPES = "admin" | "author" | "swot"