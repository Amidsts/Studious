import { RequestHandler, Request, Response, NextFunction } from "express"
import * as booksService from "./book.service"


export const newBook: RequestHandler = async (req:Request, res, next: NextFunction) => {
    try {
        const bookExist = await booksService.findBook(req.params.bookId)

        if (bookExist) {
            console.log("err")
        }

        const book = await booksService.createBook
    } catch (err) {
        next(err)
    }
}

// export const addBook = async ( payload : {[key: string]: any} ) => {
//     const Book = booksService.findBook(payload.booktitle)
//     if(Book) {
//        return "book already exist"
//     }

//     booksService.createBook(payload.booktitle, payload.bookauthor)
// }

// export const addBulkBooks = (
//     booksFile: {
//         Title: string,
//         Description: string,
//         Status: string,
//         Recommended: string,
//         CategoryType:  string
//     }[]
// ) => {
//     let booksArray = []

//     for (let i = 0; i < booksFile.length; i++) {
//         let bookIndex = booksFile[i] ;

//         booksArray.push( bookIndex )
//     }

//     booksService.addBulkBooks(booksArray)
    // const menus = new book({
    //    booksArray
    // })
    // console.log(booksArray)

// }
