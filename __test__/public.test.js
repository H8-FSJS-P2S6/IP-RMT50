const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const queryInterface = sequelize.queryInterface;

let weapon = []

beforeAll(async () => {
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
                expect(status).toBe(200)
                expect(body).toHaveProperty('data')
            });

            test(`should success weapon by id`, async () => {
                let { status, body } = await request(app)
                    .get('/weapons/2')
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
})