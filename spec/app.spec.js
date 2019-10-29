process.env.NODE_ENV = "test";

const { expect } = require('chai');
const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection')


describe('/api', () => {
    after(() => connection.destroy());
    beforeEach(() => {
        return connection.seed.run();
    })
    describe('/api/topics', () => {
        it('GET 200, returns the topic object with an array of topics and their properties', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body).to.have.keys('topics')
                })
        });
        it('GET 200, returns an object with an array of topics', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics).to.be.an('array')
                })
        });
        it('GET 200, returns an aray of objects with the correct keys', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics[0]).to.have.keys('slug', 'description')
                })
        });
        describe('/topics ERRORS', () => {
            it('DELETE 405 returns method not allowed error when trying a bad method', () => {
                return request(app)
                    .delete('/api/topics')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'Delete method denied' })
                    })
            })
        });
    });
    describe('/api/users/:username', () => {
        it('GET 200 returns a user obejct with three properties', () => {
            return request(app)
                .get('/api/users/butter_bridge')
                .expect(200)
                .then(({ body: { user } }) => {
                    expect(user).to.have.keys('username', 'avatar_url', 'name')
                })
        });
        it('GET 200 returns an object not an array', () => {
            return request(app)
            .get('/api/users/butter_bridge')
                .expect(200)
                .then(({ body: { user } }) => {
                    expect(user).to.be.an('object')
                })
        });
    });

});