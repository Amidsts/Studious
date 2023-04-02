import request from "supertest"
import mongoose from "mongoose"

import app from "../src/app"
import {connectDb} from "../src/config/db"
import Author from "../src/components/author/author.model"


const newAuthor = {
    _id: mongoose.Types.ObjectId,
    firstName: "Amidat",
    lastName: "Mustapha",
    password: "sk9aj2hbskh",
    email: "amidst@gmail.com",
    gender: "female",
    aboutAuthor: "this is a woman in tech",
    country: "Nigeria",
    state: "Kwara",
    city: "Ilorin",
    localGovt: "Ilorin east",
    postalCode: "5609218"
}

beforeAll( async () => {

    await Author.deleteMany()
    
})


afterAll( async() => {

    (await connectDb()).disconnect()

} )

describe("author", () => {

    it("should save new user details to the database", async () => {

        const response = await request(app)
        .post("/v1/author/signUpAuthor")
        .send(newAuthor)
        
        expect(response.body.data).not.toBe(null)

    })
    
    it("should sign a user in", async () => {
        
        const response = await request(app)
        .post("/v1/author/signInAuthor")
        .send({
            email: newAuthor.email,
            password: newAuthor.password
        })

        expect(response.body.data.name).toBe( `${newAuthor.firstName} ${newAuthor.lastName}`
        )
    })

    it("verify user mail for password reset", async () => {

        const response = await request(app)
        .post("/v1/author/forgotPassword")
        .send({
            email: newAuthor.email
        })
        
        expect(response.body.data).toHaveLength(6)
    })

    // it("enter forgot password verification code", async () => {

    //     const response = await request(app)
    //     .post("/v1/author/enterPasswordVerificationCode")
    //     .send({
    //         code: 
    //     })
    // })
})