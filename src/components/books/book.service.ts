import book, { IBooks } from "./books.model";

export const createBook = async ( payload: IBooks) => {
    const newBook = await new book({
        payload
    }).save() ;
    return newBook
} 

export const findBook = async (bookId: string) => {
    const bookData = await book.findOne({bookTitle: bookId})
    return bookData
}



// export  const addBulkBooks = (Books: {[payload: string]: any}[]) => {
//         new book({
//             Books
//         })
//     }
