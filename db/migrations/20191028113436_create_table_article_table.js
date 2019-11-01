
exports.up = function (knex) {
    //console.log('creating article table');
    return knex.schema.createTable('articles', articlesTable => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.text('body').notNullable();
        articlesTable.integer('votes').defaultTo(0).notNullable();
        articlesTable.string('topic').references("topics.slug").notNullable();
        articlesTable.string('author').references('users.username').notNullable();
        articlesTable.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();


    })
};

exports.down = function (knex) {
    //console.log('removing articles table')
    return knex.schema.dropTable('articles');
};
