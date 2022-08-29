// import mongoose from "mongoose"

export interface IOrder {
    cartId: string,
    deliveryLocation : string,
    deliveryFee : {
        country: string;
        state: string
        city: string;
        localGovt: string;
        postalCode:string;
    },
    deliveryPnoneNo : string
    orderDate: Date,
    cartItemsPrice: number,
    paymentMode,
    transactionId,
    orderStatus

    // swotId: string,
    // salesRepId: string,
    // bookId: string,
    // transactionId,
    // orderDate: Date,
    // confirmedAt: Date,
    // dispatchedAt: Date,
    // deliveryLocation: {
    //     city: string,
    //     postalCode: string,
    //     state: string,
    //     country: string,
    //     deliveryTelNo: string
    // },
    // expectedAmount: number,
    // discountAmount: number,
    // deliverymode: string,
    // deliveryFee: number,
    // currency: string,
    // orderStatus: Array<string>
}