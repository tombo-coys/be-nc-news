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
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            })
        });
    });
    describe('/api/users/:username', () => {
        it('GET 200 returns a user obejct with three correct keys', () => {
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
        describe('/users/:username ERRORS ', () => {
            it('DELETE 405 returns method not allowed error', () => {
                return request(app)
                    .delete('/api/users/butter_bridge')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            });
            it('PATCH 405 returns method not allowed error', () => {
                return request(app)
                    .patch('/api/users/butter_bridge')
                    .send({
                        username: 'butter_bridge',
                        name: 'tom',
                        avatar_url: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/7d/1d/39/the-spurs-cockerel.jpg',
                    })
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'PATCH method denied' })
                    })
            })
            it('GET 404 returns error message when the username passed doesnt exist', () => {
                return request(app)
                    .get('/api/users/unknownUsername')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 404,
                            msg: 'Username does not exisit'
                        })
                    })
            });
        });
    });
    describe('/api/articles/:article_id', () => {
        it('GET 200 returns an article object with the correct keys', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body: { article } }) => {
                    expect(article).to.have.keys('author', 'title', 'body', 'article_id', 'topic', 'created_at', "votes", "comment_count")
                })
        });
        it('GET 200 returns an object and not an array', () => {
            return request(app)
                .get('/api/articles/1')
                .expect(200)
                .then(({ body: { article } }) => {
                    expect(article).to.be.an('object')
                    expect(article).to.not.be.an('array')
                })
        });
        it('PATCH 200 updates the specific article and returns the updated article', () => {
            return request(app)
                .patch('/api/articles/1')
                .send({ inc_votes: 1 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.updateArticle[0]).to.have.keys('article_id', 'title', 'body', "votes", "topic", 'author', 'created_at')
                    expect(body.updateArticle[0].votes).to.eql(101)
                    expect(body.updateArticle[0]).to.be.an('object')
                })
        });
        describe('/articles/:article_id ERRORS', () => {
            it('DELETE 405 returns method not allowed error', () => {
                return request(app)
                    .delete('/api/articles/1')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            });
            xit('PATCH 405 returns method not allowed error', () => {
                return request(app)
                    .patch('/api/articles/1')
                    .send({
                        article_id: 1,
                        title: 'new title',
                        body: 'new body',
                        votes: 100000000,
                        topic: 'tom',
                        author: 'tom',
                        created_at: '2018-11-15T12:21:54.171Z',
                        comment_count: '13'
                    })
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'PATCH method denied' })
                    })
            });
            it('GET 404 returns error message when the id passed does not exist', () => {
                return request(app)
                    .get('/api/articles/999999999')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 404,
                            msg: 'Article ID does not exist'
                        })
                    })
            });
            it('GET 400 returns error message when passed an invalid article ID', () => {
                return request(app)
                    .get('/api/articles/not_a_number')
                    .expect(400)
                    .then(({ body }) => {
                        expect(body).to.eql({ status: 400, msg: 'invalid input syntax for type integer: "not_a_number"' })
                    })
            });
        });
    });


});