import { Request } from "express"

import { signupAuthor } from "../src/components/author/author.service";

describe("sign up author", () => {
    test( "enter details", async () => {
        try {
            let req:Request ;
            expect (
                await signupAuthor( req.body )
            ).toBeDefined()
            
        } catch (e) {
            console.log( `jest error ${e}` )
        }
    })

})