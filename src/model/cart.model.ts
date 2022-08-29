import {Schema, Types, model} from "mongoose"

export interface ICart {
    swotId: Types.ObjectId,
    adminId?: Types.ObjectId,
    cartItems?: {
        bookId: Types.ObjectId | string,
        bookTitle?: string,
        quantity: number,
        price: number
    }[],
    totalprice?: number,
    modifiedAt: Date
}

const cartSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    },
    swotId: {
        type: Schema.Types.ObjectId,
        ref: "Swot"
    },
    cartItems: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: "Books"
        },
        quantity: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    }

})

const cart = model<ICart>( "cart", cartSchema) 

export default cart