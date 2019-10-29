const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data');
const { formatDates, formatComments, makeRefObj } = require('../utils/utils');

exports.seed = function (knex) {

  const topicsInsertions = knex('topics')
    .insert(topicData)
    .returning('*');
  const usersInsertions = knex('users')
    .insert(userData)
    .returning('*');
  const articleInsertions = knex('articles')
    .insert(formatDates(articleData))
    .returning('*')

  return knex.migrate.rollback().then(() => knex.migrate.latest()).then(() => {
    return Promise.all([topicsInsertions, usersInsertions, articleInsertions])
      .then((insertedData) => {
        const articleRef = makeRefObj(insertedData[2]);
        const formattedComments = formatComments(commentData, articleRef);
        const updatedComments = formatDates(formattedComments)
        return knex('comments').insert(updatedComments);
      });
  })
};
