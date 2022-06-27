import { Schema, Model } from "mongoose";

interface ILibrary extends Document  {
    shelfType: string, //name of category of books on the shelf
    shelfBooks:{
        ref: string
    }[],
    shelfBooksTotal: number,
    shelfNumber: number,
    libraryLocation: string //address of the library
}