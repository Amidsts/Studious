import { number, string } from "joi"
import {
    model,
    Document,
    Types,
    Schema
} from "mongoose"

interface IPayment extends Document {
    userId?: Types.ObjectId,
    amount: number,
    paymentType: "flutterwave" | "paypal" | "paystack" | "Remita"| "stripe",
    transactionId: string,
    email: string
}

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["flutterwave", "paypal", "paystack", "Remita", "stripe"],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const payment = model<IPayment>("payment", paymentSchema)

export default payment