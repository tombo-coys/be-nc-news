process.env.NODE_ENV = "test";

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app.js');


describe('/api', () => {
    after(() => connection.destroy())
    beforeEach(() => {
        return connection.seed.run();
    })
    describe('/api/topics', () => {
        it('GET 200, returns the topic object with an array of topics and their properties', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({body}) => {
                console.log(body)
            })
        });
    });
    
});