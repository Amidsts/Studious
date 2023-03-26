import request from "supertest"
import mongoose from "mongoose"

import app from "../src/app"
import {connectDb} from "../src/config/db"
import Author from "../src/components/author/author.model"


const newAuthor = {
    _id: mongoose.Types.ObjectId,
    firstName: "Ameedat",
    lastName: "Mustapha",
    gender: "female",
    email: "Amidst@gmail.com",
    aboutAuthor: "hello, here is some test",
    country: "Nigeria",
    state: "kwara",
    city: "Ilorin",
    localGovt: "Ilorin west",
    postalCode: "4652387",
    password: "tguewg622b"
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
        
        expect(response.body).not.toBe(null)

    })
    

})