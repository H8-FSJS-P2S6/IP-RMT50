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
    describe("/POST /login/google", () => {
        describe("Success", () => {
            test("should Login Succesfully", async () => {
                let { status, body } = await request(app)
                    .post("/login/google")
                    .send({
                        googleToken: "eJhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5OTlmMGU1MGU3MmEzZTQzNzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1NjcxNTY0NTE1Njg5MzEzOTgiLCJlbWFpbCI6InJhZmlmcmFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzIwNzAzOTkwLCJuYW1lIjoiUmFmaWYgUmFtYWRoYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlBpcjVVemlyMHk1UjJaOUhWT3YyeTIydk9DVzQ4XzhaNmt5Nmlmenowd2o2M0lRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlJhZmlmIiwiZmFtaWx5X25hbWUiOiJSYW1hZGhhbiIsImlhdCI6MTcyMDcwNDI5MCwiZXhwIjoxNzIwNzA3ODkwLCJqdGkiOiJmYjdiYTgxZjQ2YzI3ZTQ0OTZiMGIyZjU0NmE3ZjU4ODBkNzY3ODRkIn0.RGXlAPA74z-2-DYZiJmR6BCrNT47k358UQ75uYwWJOSOi9RstsE0d5EZllHe6n8Q-nD0SvcRhHeIIMgDZ_8fVLSuMoPNWzeSteCewokJB_-JIG1RwzKEMHYNNHdev4Ceg6vLSktfo8nAXtX4PM6DZF2mbNIgSeTJNIdylhObr6UDv-4GSsW4FI39V4zAuihiNoWDGk7f2uBwfeg6CJQDoPaNW5gHSeThL0xPZekz_MCiAaSLQqkqZchvFP4Yd5h1ySPt0e6BjNhrf-mQvmN_C-SIsP-Spkt3OkBPTnv9g4IQtsUCLrZGpdjtLNNz1lpyA76s4680YQJATOLMKfYq0A"
                    })
                            expect(status).toBe(200)
                expect(body).toHaveProperty("access_token")

            })
        })

        describe("FAILED", () => {
            test("should Login Succesfully", async () => {
                let { status, body } = await request(app)
                    .post("/login/google")
                    .send({
                        googleToken: "JhbGciOiJSUzI1NiIsImtpZCI6Ijg3YmJlMDgxNWIwNjRlNmQ0NDljYWM5OTlmMGU1MGU3MmEzZTQzNzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTI0MjA4MzU0NjYtZ3ZmZzhycTh1c2FkNzc4dDlhYWRxdjg5N3Nha2cwaGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA1NjcxNTY0NTE1Njg5MzEzOTgiLCJlbWFpbCI6InJhZmlmcmFtYUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzIwNzAzOTkwLCJuYW1lIjoiUmFmaWYgUmFtYWRoYW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlBpcjVVemlyMHk1UjJaOUhWT3YyeTIydk9DVzQ4XzhaNmt5Nmlmenowd2o2M0lRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlJhZmlmIiwiZmFtaWx5X25hbWUiOiJSYW1hZGhhbiIsImlhdCI6MTcyMDcwNDI5MCwiZXhwIjoxNzIwNzA3ODkwLCJqdGkiOiJmYjdiYTgxZjQ2YzI3ZTQ0OTZiMGIyZjU0NmE3ZjU4ODBkNzY3ODRkIn0.RGXlAPA74z-2-DYZiJmR6BCrNT47k358UQ75uYwWJOSOi9RstsE0d5EZllHe6n8Q-nD0SvcRhHeIIMgDZ_8fVLSuMoPNWzeSteCewokJB_-JIG1RwzKEMHYNNHdev4Ceg6vLSktfo8nAXtX4PM6DZF2mbNIgSeTJNIdylhObr6UDv-4GSsW4FI39V4zAuihiNoWDGk7f2uBwfeg6CJQDoPaNW5gHSeThL0xPZekz_MCiAaSLQqkqZchvFP4Yd5h1ySPt0e6BjNhrf-mQvmN_C-SIsP-Spkt3OkBPTnv9g4IQtsUCLrZGpdjtLNNz1lpyA76s4680YQJATOLMKfYq0A"
                    })
                            expect(status).toBe(500)

            })

        })
    })
})

