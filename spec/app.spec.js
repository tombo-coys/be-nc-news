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
        it('GET 200, returns the topic object with the correct key', () => {
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
        it('GET 200, returns an aray of objects with the topic keys', () => {
            return request(app)
                .get('/api/topics')
                .expect(200)
                .then(({ body }) => {
                    expect(body.topics[0]).to.have.keys('slug', 'description')
                })
        });
        describe('api/topics ERRORS', () => {
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
        it('GET 200 returns a user obejct with three correct keys for username', () => {
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
        describe('api/users/:username ERRORS ', () => {
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
        it('GET 200 returns an article object with the specific keys for articleID', () => {
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
                .send({ inc_votes: -1 })
                .expect(200)
                .then(({ body }) => {
                    expect(body.updateArticle[0]).to.have.keys('article_id', 'title', 'body', "votes", "topic", 'author', 'created_at')
                    expect(body.updateArticle[0].votes).to.eql(99)
                    expect(body.updateArticle[0]).to.be.an('object')
                })
        });
        describe('/api/articles/:article_id ERRORS', () => {
            it('DELETE 405 returns method not allowed error', () => {
                return request(app)
                    .delete('/api/articles/1')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            });
            it('PATCH 404 returns error when patching to an ID that doesnt exist', () => {
                return request(app)
                    .patch('/api/articles/99999999')
                    .send({ inc_votes: 1 })
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 404,
                            msg: 'Article ID does not exist'
                        })
                    })
            });
            it('PATCH 400 returns error when patching to an invalid article ID', () => {
                return request(app)
                    .patch('/api/articles/not_a_number')
                    .send({ inc_votes: 1 })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 400,
                            msg: "invalid input syntax for type integer: \"not_a_number\""
                        })
                    })
            });
            it('PATCH 400 returns error when sending an invalid key for the patch', () => {
                return request(app)
                    .patch('/api/articles/1')
                    .send({ topic: 1 })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 400,
                            msg: "Bad Request: You cannot update that key, only votes"
                        })
                    })
            });
            it('PATCH 400 returns error when sending an invaid value for the patch', () => {
                return request(app)
                    .patch('/api/articles/1')
                    .send({ inc_votes: 'string' })
                    .expect(400)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 400,
                            msg: "invalid input syntax for type integer: \"NaN\""
                        })
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
        describe('/api/articles/:article_id/comments', () => {
            it('POST 201 accepts an object with the correct properties', () => {
                return request(app)
                    .post('/api/articles/1/comments')
                    .send({ username: 'butter_bridge', body: 'this is a test commment' })
                    .expect(201)
                    .then(({ body: { returnedComment } }) => {
                        expect(returnedComment[0].body).to.eql('this is a test commment');
                        expect(returnedComment[0].author).to.eql('butter_bridge');
                    })
            });
            it('GET 200 retuns an array of the comments for a given article ID', () => {
                return request(app)
                    .get('/api/articles/1/comments')
                    .expect(200)
                    .then(({ body: { comments } }) => {
                        expect(comments).to.be.an('array')
                        expect(comments[0]).to.have.keys('comment_id', 'votes', 'created_at', 'author', "body")
                    })
            });
            it('GET 200 returns an empty array when the article exists with no comments attached', () => {
                return request(app)
                    .get('/api/articles/2/comments')
                    .expect(200)
                    .then(({ body: { comments } }) => {
                        expect(comments).to.eql([])
                    })
            });
            describe('/api/articles/:article_id/comments ERRORS', () => {
                it('POST 404 returns error message when the article id does not exist', () => {
                    return request(app)
                        .post('/api/articles/9999999/comments')
                        .send({ username: 'butter_bridge', body: 'this is a test commment' })
                        .expect(404)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 404,
                                msg: 'insert or update on table \"comments\" violates foreign key constraint \"comments_article_id_foreign\"'
                            })
                        })
                });
                it('POST 400 returns error message when the article ID is invalid', () => {
                    return request(app)
                        .post('/api/articles/notAnumber/comments')
                        .send({ username: 'butter_bridge', body: 'this is a test commment' })
                        .expect(400)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 400,
                                msg: "invalid input syntax for type integer: \"notAnumber\""
                            })
                        })
                });
                it('POST 400 returns error when sending an invalid key', () => {
                    return request(app)
                        .post('/api/articles/1/comments')
                        .send({ name: 'butter_bridge', comment: 'this is a test commment' })
                        .expect(400)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 400,
                                msg: "Bad Request: keys do not exist"
                            })
                        })
                });
                it('POST 400 returns error when username does not exist', () => {
                    return request(app)
                        .post('/api/articles/1/comments')
                        .send({ username: 'tom', body: 'this is a test commment' })
                        .expect(404)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 404,
                                msg: 'insert or update on table \"comments\" violates foreign key constraint \"comments_author_foreign\"'
                            })
                        })
                });
                it('GET 404 returns error message when article ID doesnt exist', () => {
                    return request(app)
                        .get('/api/articles/99999999/comments')
                        .expect(404)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 404,
                                msg: 'Article ID does not exisit'
                            })
                        })
                });
                it('GET 400 returns error message when passed with an invalid article ID', () => {
                    return request(app)
                        .get('/api/articles/notanumber/comments')
                        .expect(400)
                        .then(({ body }) => {
                            expect(body).to.eql({
                                status: 400,
                                msg: 'invalid input syntax for type integer: \"notanumber\"'
                            })
                        })
                });
            });
            xit('QUERIES GET 200', () => {

            });
        });
    });

});