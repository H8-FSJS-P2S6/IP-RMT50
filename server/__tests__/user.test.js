const request = require(`supertest`)
const app = require(`../app`)
const { sequelize } = require('../models')
const queryInterface = sequelize.queryInterface;
const User = require(`../models`).User

const user_text_1 = {
    username: "raf",
    password: "raf",
}

describe("/users", () => {
    describe("/POST /login", () => {
        describe("Success", () => {
            test("should Login Succesfully", async () => {
                let { status, body } = await request(app)
                    .post("/login")
                    .send(user_text_1)
                expect(status).toBe(200)
                expect(body).toHaveProperty("access_token")

            })
        })

        describe("FAILED", () => {
            test("username not given", async () =>{
                let {status, body} = await request(app)
                .post("/login")
                .send({
                    password: "yayan",
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Username is required")
            })
            test("Password not given", async () =>{
                let {status, body} = await request(app)
                .post("/login")
                .send({
                    username: "yayan",
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty("message", "Password is required")
            })
            test("Password is invalid", async () =>{
                let {status, body} = await request(app)
                .post("/login")
                .send({
                    username: "yayan",
                    password: "wawan"
                })
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Invalid Username/Password")
            })
            test("email is invalid", async () =>{
                let {status, body} = await request(app)
                .post("/login")
                .send({
                    username: "wawan",
                    password: "yayan"
                })
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", "Invalid Username/Password")
            })

        })
    })
})

