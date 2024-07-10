const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');
const queryInterface = sequelize.queryInterface;

let access_token = '';
const party = {
    UserId: 1
}

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

    const data = require('../data/user.json').map((e) => {
        delete e.id;
        e.password = hashPassword(e.password);
        e.createdAt = e.updatedAt = new Date();
        return e
    })
    await queryInterface.bulkInsert(`Users`, data, {})

    let user = await User.findOne({ where: { role: `Admin` } });
    access_token = signToken({ id: user.id })

    await queryInterface.bulkInsert('Characters', [{
        id: 1,
        name: "Amber",
        rarity: "4_star",
        weapon: "Bow",
        vision: "Pyro",
        wiki_url: "https://genshin-impact.fandom.com/wiki/Amber",
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});

    const party = require('../data/party.json').map((e) => {
        delete e.id
        e.createdAt = e.updatedAt = new Date()
        return e
    })
    try {

        await queryInterface.bulkInsert('Parties', party, {});
    } catch (err) {
        console.log(err)
    }

    // const team = require('../data/team.json').map((e) => {
    //     delete e.id
    //     e.createdAt = e.updatedAt = new Date()
    //     return e
    // })
    // await queryInterface.bulkInsert('Teams', team, {});
})

describe('Party', () => {
    describe('/party', () => {
        test('should success show all party', async () => {
            let { body, status } = await request(app)
                .get('/party')
                .set('Authorization', `Bearer ` + access_token)
            expect(status).toBe(200)
            expect(body).toHaveProperty('party')
        });

        test('should success create party', async () => {
            let { body, status } = await request(app)
                .post('/party')
                .set('Authorization', `Bearer ` + access_token)
                .send({ UserId: 2 })
            expect(status).toBe(201)
            expect(body).toHaveProperty('party')
        });

        test('should success create team', async () => {
            let { body, status } = await request(app)
                .post('/party/1/team')
                .set('Authorization', `Bearer ` + access_token)
                .send({ CharacterId: 1, WeaponId: 1 })
            expect(status).toBe(201)
            expect(body).toHaveProperty('team')
        });

        test('should fail delete party when party have teams', async () => {
            let { body, status } = await request(app)
                .delete('/party/1')
                .set('Authorization', `Bearer ` + access_token)
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "Cannot delete party that has teams")
        });

        test('should fail created team when token is wrong', async () => {
            let { body, status } = await request(app)
                .post('/party/1/team')
                .set('Authorization', `Bearer` + access_token)
                .send({
                    WeaponId: 1
                })
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', "Unauthenticated")
        });

        test('should fail delete party when party not found', async () => {
            let { body, status } = await request(app)
                .delete('/party/11')
                .set('Authorization', `Bearer ` + access_token)
            expect(status).toBe(404)
            expect(body).toHaveProperty('message', "Party with id 11 not found")
        });

        test('should fail delete party when token not found', async () => {
            let { body, status } = await request(app)
                .delete('/party/1')
                .set('Authorization', `Bearer` + access_token)
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', "Unauthenticated")
        });

        test('should failed create party because party is full', async () => {
            let { body, status } = await request(app)
                .post('/party')
                .set('Authorization', `Bearer ` + access_token)
                .send({ UserId: 1 })
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', 'Your party is full')
        });

        test('should fail created team when Weapon is null/empty', async () => {
            let { body, status } = await request(app)
                .post('/party/1/team')
                .set('Authorization', `Bearer ` + access_token)
                .send({
                    CharacterId: 1
                })
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "Weapon Id is required")
        });

        test('should fail created team when Character is null/empty', async () => {
            let { body, status } = await request(app)
                .post('/party/1/team')
                .set('Authorization', `Bearer ` + access_token)
                .send({
                    WeaponId: 1
                })
            expect(status).toBe(400)
            expect(body).toHaveProperty('message', "Character Id is required")
        })

        test('should failed create party when token is wrong', async () => {
            let { body, status } = await request(app)
                .post('/party')
                .set('Authorization', `Bearer` + `access_token`)
                .send({ UserId: 1 })
            expect(status).toBe(401)
            expect(body).toHaveProperty('message', 'Unauthenticated')
        });
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Characters', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

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

    await queryInterface.bulkDelete('Parties', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Teams', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('Users', null, {
        restartIdentity: true,
        truncate: true,
        cascade: true
    });
});