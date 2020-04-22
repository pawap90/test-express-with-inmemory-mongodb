'use strict';

const request = require('supertest');

const testSetup = require('./setup');

let server = null;

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await testSetup.setupDatabase();
    const app = await require('../src/server-init').startServer();

    server = app.listen(process.env.port);
});

/**
 * Close the db and server.
 */
afterAll(async () => {
    await testSetup.closeDatabase();
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

afterEach(() => {
    server.close();
});

/**
 * POST api/product test suite.
 */
describe('api/product ', () => {
    it('POST api/product should insert a product in the database', async () => {
        const res = await request(server)
            .post('/api/product')
            .send(productComplete);

        expect(res.status).toBe(200);
    });

    it('GET api/product/:id should throw error if id not exists', async () => {
        const res = await request(server)
            .get('/api/product/5d6ede6a0ba62570afcedd3a');

        expect(res.status).toBe(500);
    });
});

const productComplete = {
    name: 'iPhone 11',
    price: 699,
    description: 'A new dual‑camera system captures more of what you see and love. '
};