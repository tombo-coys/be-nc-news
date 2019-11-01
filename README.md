# Toms-NC-News-App

This repo is the back-end API for a news app. The app allows users to read topics and articles, to post, update and delete comments, and to 'up-vote' and 'down-vote' articles and comments, in a similar fashion to reddit. 

## Building the API

The API uses a PSQL database and is built using knex and express. The live API is hosted on Heroku, [here](https://toms-nc-news-app.herokuapp.com/api)

## Getting Started

I have used Test Driven Development best practices to build the API. To run the tests or to get the API running locally, follow these installation instructions:

Clone this repository by running the code below in your terminal:

    git clone https://github.com/tombo-coys/be-nc-news.git

`cd` into the directory and add the required dependencies by running the code below in the directory:

    npm i knex pg express

You will need to create a 'knexfile.js' to allow local deployment and testing, as this has been included in the .gitignore. To do so run the following command in your terminal

    touch knexfile.js

Make sure the file is stored in the root directory, and it should contain the following code:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'nc_news'
    }
  },
  test: {
    connection: {
      database: 'nc_news_test'
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
```

Set the databases up using the command

    npm run setup-dbs

The app.spec.js file will reseed the database everytime the tests are run.

To run the tests in the spec/app.spec.js file, and the tests in the spec/utils/spec.js, you will need to run the following code in the terminal to install the developemnt dependencies:

    npm i chai chai-sorted mocha supertest -D

To run the app-secific tests use the command

    npm run test-app

And to run the tests on the utils function, use the command 

    npm run test-utils



## Endpoints

The API has the following endpoints available to the user, with the methods shown at the beginning of each line

```
GET /api/topics
GET /api/users/:username
GET /api/articles/:article_id
PATCH /api/articles/:article_id
POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments
GET /api/articles
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
GET /api
```

## Built With 

- [Node.js](https://nodejs.org/en/) - Javascript runtime
- [PostgreSQL](https://www.postgresql.org/) - open-source relational database system
- [Express](https://expressjs.com/) - a web framework for Node.js
- [Knex](http://knexjs.org/) - an SQL query builder


## Acknowledgements

- [Northcoders](https://northcoders.com/) for the support and wonderful curriculum.

- [Jcraggs](https://github.com/jcraggs) and [Harrypfry](https://github.com/harrypfry/) for the intermittent pair-programming and debugging help

