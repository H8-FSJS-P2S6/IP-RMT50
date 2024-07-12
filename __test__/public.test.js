const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const queryInterface = sequelize.queryInterface;

let weapon = []

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


    const type = require('../data/type.json').map((e) => {
        delete e.id
        e.createdAt = e.updatedAt = new Date()
        return e
    })
    await queryInterface.bulkInsert('Types', type, {})

    weapon = require('../data/weapon.json').map((e) => {
        delete e.id
        e.createdAt = e.updatedAt = new Date()
        return e
    })
    await queryInterface.bulkInsert('Weapons', weapon, {})
})

describe('Pub', () => {
    describe('/weapons', () => {
        describe('Success', () => {
            test(`should success show all weapon`, async () => {
                let { status, body } = await request(app)
                    .get('/weapons')
                    .set('Authorization', `Bearer ` + access_token)
                expect(status).toBe(200)
                expect(body).toHaveProperty('data')
            });

            test(`should success weapon by id`, async () => {
                let { status, body } = await request(app)
                    .get('/weapons/2')
                    .set('Authorization', `Bearer ` + access_token)
                expect(status).toBe(200)
                expect(body).toHaveProperty('data')
            });
        })
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Weapons', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Types', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });
})