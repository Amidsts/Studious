export type paymentOptions= {
    user: {
        firstName: string,
        lastName: string,
        Email: string,
    },
    Amount: number,
    currency: "NGN" | "USD" | "GHS" | "ZAR",
    transactionId?: string,
    redirectCallback?: any
}

export type statusType = "active" | "inactive" | "submitted" ;

//books
export enum bookStatusENUM {
    AVAILABLE ='available',
    SOLD_OUT = 'soldOut'
}

export enum statusENUM {
    ACTIVE ="active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended",
    DISABLED = "disabled"
} 

//admin
//ENUM

// export enum adminRoleENUM {
//     ACTIVE ="active",
//     INACTIVE = "inactive",
//     SUSPENDED = "suspended",
//     DISABLED = "disabled"
// } 



// UNION TYPES
// export type roleTYPES =  "author" | "swot"

