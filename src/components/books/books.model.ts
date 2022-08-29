/* eslint-disable @typescript-eslint/no-explicit-any */
import {Schema, model, Model} from "mongoose";

export interface IBooks {
    authorId: string;
    bookTitle: string;
    description: string;
    category: string;
    currency: string[];
    price: number;
    discountPrice: number; 
    bookSwots?: {
        type:string,
        ref: string
    }[]         //array of people that have purchase the book
    status: 'available' | 'soldOut';
    img: { [key: string]: any };
    recommended: boolean;
    ratings: number;
    reviews: Array<string>,
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
        type: String
    }],
    price: {
        type: Number, 
        required: true
    },
    discountPrice: {
        type: String
    },
    bookSwots: [{
        type: String,
    }],
    status:{
        type: String,
        enum: ["available", "sold out"],
        required:true
    },
    img: {
        imgId : {
            type :  String,
            default: ""
        },
        imgLink :  {
            type :  String,
            default: ""
        } 
    },
    recommended:{
        type: Boolean
    },
   ratings: {
        type: Number,
        default: 0
    },
    categoryType:{
        type: String,
        enum: ['religion' ,'romance' ,'mystery'],
        required:true
    }
},{timestamps: true})

const book: Model<IBooks> = model("Books", bookSchema)

export default book