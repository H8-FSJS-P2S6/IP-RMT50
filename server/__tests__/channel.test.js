const request = require(`supertest`)
const app = require(`../app`)
const { sequelize } = require('../models')
const queryInterface = sequelize.queryInterface;
const User = require(`../models`).User
const Category = require(`../models`).Category
const Cuisine = require(`../models`).Cuisine

const user = [
    {
        "channelName": "Holosimper Ch.",
        "channelId": "UCEVKaZpv7xw1jOVN6422z5A",
        "tag": "HoloEN",
        "createdAt": new Date(),
        "updatedAt": new Date(),
    }
]

// beforeAll(async () => {
//     await queryInterface.bulkInsert('ChannelViews', user);
// })

afterAll(async () => {
    await queryInterface.bulkDelete("Channels", null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
    await queryInterface.bulkDelete("ChannelViews", null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    })
})


describe("GET/allChannels", () => {
    test("GET /allChannels succesfull", async () => {
        let { status, _body } = await request(app)
            .get(`/allChannels`)   

        expect(status).toBe(500)

    })
})

describe("POST /channel", () => {
    test("POST /channel succesfull", async () => {
        let { status, _body } = await request(app)
            .post(`/channel`)
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwNjk1ODUwfQ.a08hnGWtPsy_IfmrDK_LbogaYqnuN1keJNszG_4MlMI`)
            .send({
                link: "https://www.youtube.com/@TheFrostPrime",
                tag: "HoloEN"
            })
            console.log(_body,"<=============body")
        expect(status).toBe(500)
    })
})

// describe("PUT /channel", () => {
//     test("PUT /channel succesfull", async () => {
//         let { status, _body } = await request(app)
//             .post(`/channel/UCEVKaZpv7xw1jOVN6422z5A`)
//             .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwNjk1ODUwfQ.a08hnGWtPsy_IfmrDK_LbogaYqnuN1keJNszG_4MlMI`)
//             .send({
//                 tag: "HoloEN"
//             })

//         expect(status).toBe(200)
//     })
// })

// describe("GET/pub/cuisine/:id", () => {
//     test("GET /pub/cuisine/:id succesfull", async () => {
//         let { status, _body } = await request(app)
//             .get(`/pub/cuisine/1`)


//         expect(status).toBe(200)
//         expect(_body).toHaveProperty('id');
//         expect(_body).toHaveProperty('name');
//         expect(_body).toHaveProperty('description');
//         expect(_body).toHaveProperty('price');
//         expect(_body).toHaveProperty('imgUrl');
//         expect(_body).toHaveProperty('createdAt');
//         expect(_body).toHaveProperty('updatedAt');
//         expect(_body).toHaveProperty('CategoryId');
//         expect(_body).toHaveProperty('AuthorId');
//     })
//     test("Cuisine Id should be correct", async () => {
//         let { status, body } = await request(app)
//             .get(`/pub/cuisine/100`)
//         expect(status).toBe(404)
//         expect(body).toHaveProperty("message", "Cuisine not found")
//     })
    
// })

