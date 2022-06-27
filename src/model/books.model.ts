import {Schema, model, Model} from "mongoose";

export interface IBooks {
    authorId: string;
    bookTitle: string;
    description: string;
    category: string;
    currency: string[];
    price: number;
    discountPrice: number; 
    // recommendedBooks: { id: number, name: string, price: number }[];
    bookSwot?: {
        type:string,
        ref: string
    }[]         //array of people that have purchase the book
    status: 'available' | 'soldOut';
    img: { [key: string]: any };
    recommended: boolean;
    ratings: number;
    categoryType: 'Religion' | 'Romantic' | 'mystery';
}

const bookSchema = new Schema({
   authorId: {
        type: String, 
        required: true
    },
    bookTitle: {
        type: String, 
        required: true
    },
    description:{
        type: String,
        required:true
    },
    category: {
        type: String, 
        required: true
    },
    currency: [{
        type: String, 
        required: true
    }],
    price: {
        type: Number, 
        required: true
    },
    discountPrice: {
        type: String, 
        required: true
    },
    bookSwot: [{
        type: String,
    }],
    status:{
        type: String,
        required:true
    },
    img: {
        type: String, 
        required: true
    },
    recommended:{
        type: String,
    },
   ratings: {
        type: Number,
        default: 0
    },
    categoryType:{
        type: String,
        enum: ['Religion' ,'Romantic' ,'mystery'],
        required:true
    }
},{timestamps: true})

const book: Model<IBooks> = model("Books", bookSchema)

export default book