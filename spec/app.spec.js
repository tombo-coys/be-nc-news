process.env.NODE_ENV = "test";

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app.js');


describe('/api', () => {
    after(() => connection.destroy())
    beforeEach(() => {
        return connection.seed.run();
    })
    it('', () => {

    });
});