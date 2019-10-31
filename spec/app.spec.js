process.env.NODE_ENV = "test";
const chai = require("chai")
chai.use(require("chai-sorted"))
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
            it('ERROR DELETE 405 returns method not allowed error when trying a bad method', () => {
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
            it('ERROR DELETE 405 returns method not allowed error', () => {
                return request(app)
                    .delete('/api/users/butter_bridge')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            });
            it('ERROR PATCH 405 returns method not allowed error', () => {
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
            it('ERROR GET 404 returns error message when the username passed doesnt exist', () => {
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
    describe('/api/articles', () => {
        it('GET 200 returns an array of objects', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    expect(returnedArticles).to.be.an('array')
                })
        });
        it('GET 200 returns an array of objects that have the specified article keys', () => {
            return request(app)
                .get('/api/articles')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    expect(returnedArticles[0]).to.have.keys('article_id', 'author', 'title', 'topic', 'created_at', 'votes', 'comment_count')
                })
        });
        it('QUERIES GET 200 sorts the articles, defaulting to created_at in descending order', () => {
            return request(app)
                .get('/api/articles?sort_by=created_at')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    expect(returnedArticles).to.be.descendingBy('created_at')
                })
        });
        it('QUERIES GET 200 sorts the articles by article_id in ascending order', () => {
            return request(app)
                .get('/api/articles?sort_by=article_id&order=asc')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    expect(returnedArticles).to.be.ascendingBy('article_id')
                })
        });
        it('QUERIES GET 200 filters articles by the username value specified', () => {
            return request(app)
                .get('/api/articles?author=icellusedkars')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    returnedArticles.forEach(article => {
                        expect(article.author).to.eql('icellusedkars')
                    });
                })
        });
        it('QUERIES GET 200 filters articles by the topic value specified', () => {
            return request(app)
                .get('/api/articles?topic=mitch')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    returnedArticles.forEach(article => {
                        expect(article.topic).to.eql('mitch')
                    });
                })
        });
        it('QUERIES GET 200 filters articles by both topic and author ', () => {
            return request(app)
                .get('/api/articles?topic=mitch&author=icellusedkars')
                .expect(200)
                .then(({ body: { returnedArticles } }) => {
                    returnedArticles.forEach(article => {
                        expect(article.topic).to.eql('mitch')
                        expect(article.author).to.eql('icellusedkars')
                    });
                })
        });
        describe.only('api/articles ERRORS', () => {
            it('ERROR DELETE 405 returns method not allowed message', () => {
                return request(app)
                    .delete('/api/articles')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'DELETE method denied' })
                    })
            });
            it('ERROR PATCH 405 returns method not allowed message', () => {
                return request(app)
                    .patch('/api/articles')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'PATCH method denied' })
                    })
            });
            it('ERROR POST 405 returns method not allowed message', () => {
                return request(app)
                    .post('/api/articles')
                    .expect(405)
                    .then(({ body }) => {
                        expect(body).to.eql({ msg: 'POST method denied' })
                    })
            });
            it('ERROR GET 404 returns error message when sorting by an invalid column name ', () => {
                return request(app)
                    .get('/api/articles?sort_by=badColname')
                    .expect(404)
                    .then(({ body }) => {
                        expect(body).to.eql({
                            status: 404,
                            msg: 'column \"badColname\" does not exist'
                        })
                    })
            });
            it('ERROR GET 404 returns error message when filtering on an author that doesnt exist', () => {
                return request(app)
                .get('/api/articles?order=goat')
                .expect(400)
                .then(({ body }) => {
                    expect(body).to.eql({
                        status: 400,
                        msg: 'cannot order by goat, only ascending or descending'
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
        it('ERROR DELETE 405 returns method not allowed error', () => {
            return request(app)
                .delete('/api/articles/1')
                .expect(405)
                .then(({ body }) => {
                    expect(body).to.eql({ msg: 'DELETE method denied' })
                })
        });
        it('ERROR PATCH 404 returns error when patching to an ID that doesnt exist', () => {
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
        it('ERROR PATCH 400 returns error when patching to an invalid article ID', () => {
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
        it('ERROR PATCH 400 returns error when sending an invalid key for the patch', () => {
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
        it('ERROR PATCH 400 returns error when sending an invaid value for the patch', () => {
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
        it('ERROR GET 404 returns error message when the id passed does not exist', () => {
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
        it('ERROR GET 400 returns error message when passed an invalid article ID', () => {
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
        it('QUERIES GET 200 sort_by returns the comments sorted by deault to created_at column in descending order', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=created_at')
                .expect(200)
                .then(({ body: { comments } }) => {
                    expect(comments).to.be.descendingBy('created_at')
                })
        });
        it('QUERIES GET 200 returns the comments ordered in ascending order by the created_at column', () => {
            return request(app)
                .get('/api/articles/1/comments?order=asc')
                .expect(200)
                .then(({ body: { comments } }) => {
                    expect(comments).to.be.ascendingBy('created_at')
                })
        });
        it('QUERIES GET 200 returns the comments ordered by comment_id in ascending order ', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=comment_id&order=asc')
                .expect(200)
                .then(({ body: { comments } }) => {
                    expect(comments).to.be.ascendingBy('comment_id')
                })
        });
    });
    describe('/api/articles/:article_id/comments ERRORS', () => {
        it('ERROR POST 404 returns error message when the article id does not exist', () => {
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
        it('ERROR POST 400 returns error message when the article ID is invalid', () => {
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
        it('ERROR POST 400 returns error when sending an invalid key', () => {
            return request(app)
                .post('/api/articles/1/comments')
                .send({ name: 'butter_bridge', comment: 'this is a test commment' })
                .expect(400)
                .then(({ body }) => {
                    expect(body).to.eql({
                        status: 400,
                        msg: "column \"comment\" of relation \"comments\" does not exist"
                    })
                })
        });
        it('ERROR POST 400 returns error when username does not exist', () => {
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
        it('ERROR GET 404 returns error message when article ID doesnt exist', () => {
            return request(app)
                .get('/api/articles/99999999/comments')
                .expect(404)
                .then(({ body }) => {
                    expect(body).to.eql({
                        status: 404,
                        msg: 'Article ID does not exist'
                    })
                })
        });
        it('ERROR GET 400 returns error message when passed with an invalid article ID', () => {
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
        it('ERROR QUERY GET 400 returns error message when trying to order by an invalid input ', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=comment_id&order=goat')
                .expect(400)
                .then(({ body }) => {
                    expect(body).to.eql({
                        status: 400,
                        msg: 'cannot order by goat, only ascending or descending'
                    })
                })
        });
        it('ERROR QUERY GET 404 returns error when sorting by an invalid column', () => {
            return request(app)
                .get('/api/articles/1/comments?sort_by=goat')
                .expect(404)
                .then(({ body }) => {
                    expect(body).to.eql({
                        status: 404,
                        msg: 'column \"goat\" does not exist'
                    })
                })
        });
        it('ERROR DELETE 405 returns method not allowed error', () => {
            return request(app)
                .delete('/api/articles/1/comments')
                .expect(405)
                .then(({ body }) => {
                    expect(body).to.eql({ msg: 'DELETE method denied' })
                })
        });
        it('ERROR PATCH 405 returns method not allowed error', () => {
            return request(app)
                .patch('/api/articles/1/comments')
                .send({ body: 'comment shlould be this', username: 'a_name' })
                .expect(405)
                .then(({ body }) => {
                    expect(body).to.eql({ msg: 'PATCH method denied' })
                })
        });
    });
});

});