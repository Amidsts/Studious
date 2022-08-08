// import mongoose from "mongoose"

export interface ICart {
    cartItems: {
        bookId: string,
        quantity: string,
    }[],

}