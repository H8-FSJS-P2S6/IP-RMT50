const request = require('supertest');
const app = require('../app');
const { hashPassword } = require('../helpers/bcrypt');
const { sequelize, User } = require('../models');
const { signToken } = require('../helpers/jwt');
const queryInterface = sequelize.queryInterface;

const admin = {
    email: `user1@mail.com`,
    password: `user1`
};

const staff = {
    email: `user2@mail.com`,
    password: `user2`
};

const register = {
    name: 'testing1',
    email: 'testing1@mail.com',
    role: `Staff`,
    password: `testing1`
}

let access_token = ``;

beforeAll(async () => {
    const data = require('../data/user.json').map((e) => {
        delete e.id;
        e.password = hashPassword(e.password);
        e.createdAt = e.updatedAt = new Date();
        return e
    })
    await queryInterface.bulkInsert(`Users`, data, {})

    let user = await User.findOne({ where: { role: `Admin` } });
    access_token = signToken({ id: user.id })
});

describe('User', () => {
    describe('/register', () => {
        describe('Success', () => {
            test('should success register new user', async () => {
                let { status, body } = await request(app)
                    .post('/register')
                    .set(`Authorization`, `Bearer ` + access_token)
                    .send(register)
                expect(status).toBe(201)
                expect(body).toHaveProperty(`id`, expect.any(Number))
                expect(body).toHaveProperty(`email`, register.email)
            });
        });

        describe('Failed', () => {
            test('should fail when name is null', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        email: `test1@mail.com`,
                        password: `test_1`
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Name is required`)
            });

            test('should fail when name is null', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        name: ``,
                        email: `test1@mail.com`,
                        password: `test_1`
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Name cannot be empty`)
            });

            test('should fail when email is null', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        name: `test 1`,
                        password: `test_1`
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Email is required`)
            });

            test('should fail when email is empty', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        name: `test 1`,
                        email: ``,
                        password: `test_1`
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Email cannot be empty`)
            });

            test('should fail when password is null/empty', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        name: `test 1`,
                        email: `test1@mail.com`
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Password is required`)
            });

            test('should fail when password is null/empty', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer ' + access_token)
                    .send({
                        name: `test 1`,
                        email: `test1@mail.com`,
                        password: ""
                    })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message', `Password cannot be empty`)
            });

            test('should fail when token is invalid', async () => {
                let { body, status } = await request(app)
                    .post('/register')
                    .set('Authorization', 'Bearer')
                    .send(register)
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', `Unauthenticated`)
            });
        })
    })

    describe('/login', () => {
        describe('Success', () => {
            test('should success login', async () => {
                let { body, status } = await request(app)
                    .post('/login')
                    .send({
                        email: `user1@mail.com`,
                        password: `user1`
                    })
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
            });
        });

        describe('Failed', () => {
            test('should failed login when email is null', async () => {
                let { body, status } = await request(app)
                    .post('/login')
                    .send({
                        password: `user1`
                    })
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Email is required')
            });

            test('should failed login when password is null', async () => {
                let { body, status } = await request(app)
                    .post('/login')
                    .send({
                        email: `user1@mail.com`
                    })
                expect(status).toBe(401)
                expect(body).toHaveProperty('message', 'Password is required')
            });
        })
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });
});