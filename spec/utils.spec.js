const { expect } = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed an empty array', () => {
    const input = [];
    const expected = [];
    expect(formatDates(input)).to.eql(expected);
  });
  it('returns one array item with the created_at value updated to a JS date object', () => {
    const input = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: 1492163783248
    }]
    const expected = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: new Date(input[0].created_at)
    }]
    expect(formatDates(input)).to.eql(expected);
  });
  it('returns more than one array item with the created_at value updated to a JS date object', () => {
    const input = [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: 1416140514171,
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: 1289996514171,
    }];
    const expected = [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
      created_at: new Date(input[0].created_at),
    },
    {
      title: 'Eight pug gifs that remind me of mitch',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'some gifs',
      created_at: new Date(input[1].created_at)
    }];
    expect(formatDates(input)).to.eql(expected)
  });
  it('does not mutate the original array ', () => {
    const input = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: 1492163783248
    }]
    const expected = [{
      title: 'The vegan carnivore?',
      topic: 'cooking',
      author: 'tickle122',
      body: 'The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.',
      created_at: 1492163783248
    }]
    formatDates(input)
    expect(input).to.eql(expected)
  });
});

describe('makeRefObj', () => {
  it('returns an empty object when passed an empty Array', () => {
    const actual = [];
    const expected = {};
    expect(makeRefObj(actual)).to.eql(expected)
  });
  it('returns an object with one key-value pair when passed an array with one object', () => {
    const actual = [{
      article_id: 35,
      title: 'Stone Soup',
      body: 'The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.',
      votes: 0,
      topic: 'cooking',
      author: 'cooljmessy',
      created_at: '2016 - 12 - 13T20: 58: 40.516Z'
    }]

    const expected = { 'Stone Soup': 35 }
    expect(makeRefObj(actual)).to.eql(expected)
  });
  it('returns an object with two key-value pairs when passed an array with two items', () => {
    const actual = [{
      article_id: 24,
      title: 'Game of talents: management lessons from top football coaches',
      body: 'At lunchtime on the day of the Champions League final in 2012, Chelsea’s manager Roberto Di Matteo had selected 10 of his 11 players. He just didn’t know who to play in left midfield. The player would have to combat Bayern Munich’s brilliant Arjen Robben and Philipp Lahm. Going into the last team meeting, Di Matteo had a private chat with his left-back, Ashley Cole. He outlined the situation, then asked Cole who he would play at left-midfield. Instead of naming a seasoned star, Cole said: “Ryan Bertrand.” The 22-year-old reserve Bertrand had never played in the Champions League, let alone in club football’s biggest game. “Why?” asked Di Matteo, surprised. “I trust him,” replied Cole. Bertrand played well, and Chelsea beat Bayern on penalties. In part, this was a victory for talent management. Di Matteo had put aside his ego, and let trust between two players drive the decision. Talent management has been a business obsession at least since 1997, when the consultancy McKinsey identified a “war for talent”. The most visible battleground of this “war” is team sport. Football, in particular, is “the quintessential model for modern-day talent-dependent business”, writes Chris Brady, professor at Salford Business School. Big football clubs pay more than half their revenues to between 3 and 7 per cent of their workforce: the players. These young men are rich, multinational, mobile, often equipped with large egos and therefore hard to manage. Football managers are, above all, talent managers.',
      votes: 0,
      topic: 'football',
      author: 'jessjelly',
      created_at: '2017-04-01T10:54:48.304Z'
    },
    {
      article_id: 25,
      title: 'Sweet potato & butternut squash soup with lemon & garlic toast',
      body: 'Roast your vegetables in honey before blitzing into this velvety smooth, spiced soup - served with garlicky, zesty ciabatta slices for dipping',
      votes: 0,
      topic: 'cooking',
      author: 'weegembump',
      created_at: '2017-08-18T09:25:14.275Z'
    }];


    const expected = { 'Game of talents: management lessons from top football coaches': 24, 'Sweet potato & butternut squash soup with lemon & garlic toast': 25 }
    expect(makeRefObj(actual)).to.eql(expected);
  });
  it('does not mutate the original array', () => {
    const actual = [{
      article_id: 25,
      title: 'Sweet potato & butternut squash soup with lemon & garlic toast',
      body: 'Roast your vegetables in honey before blitzing into this velvety smooth, spiced soup - served with garlicky, zesty ciabatta slices for dipping',
      votes: 0,
      topic: 'cooking',
      author: 'weegembump',
      created_at: '2017-08-18T09:25:14.275Z'
    }];
    const expected = [{
      article_id: 25,
      title: 'Sweet potato & butternut squash soup with lemon & garlic toast',
      body: 'Roast your vegetables in honey before blitzing into this velvety smooth, spiced soup - served with garlicky, zesty ciabatta slices for dipping',
      votes: 0,
      topic: 'cooking',
      author: 'weegembump',
      created_at: '2017-08-18T09:25:14.275Z'
    }];
    makeRefObj(actual)
    expect(actual).to.eql(expected)
  });
});

describe('formatComments', () => {
  it('returns an empty array when passed an empty array', () => {
    const input = [];
    const articleRef = {}
    const expected = [];
    expect(formatComments(input, articleRef)).to.eql(expected)
  });
  it('returns a re-formatted array item when passed a single array item ', () => {
    const input = [{
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      created_by: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }];
    const articleRef = { 'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 }
    const expected = [{
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      article_id: 29,
      author: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }];
    expect(formatComments(input, articleRef)).to.eql(expected);
  });
  it('returns a refomatted array item when passed more than one array item', () => {
    const actual = [{
      body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint. Laborum tempore est et quisquam dolore. Qui voluptas consequatur cumque neque et laborum unde sed. Impedit et consequatur tempore dignissimos earum distinctio cupiditate.',
      belongs_to: 'Who are the most followed clubs and players on Instagram?',
      created_by: 'happyamy2016',
      votes: 17,
      created_at: 1489789669732
    },
    {
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      created_by: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }]
    const articleRef = { 'Who are the most followed clubs and players on Instagram?': 19, 'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 }
    const expected = [{
      body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint. Laborum tempore est et quisquam dolore. Qui voluptas consequatur cumque neque et laborum unde sed. Impedit et consequatur tempore dignissimos earum distinctio cupiditate.',
      article_id: 19,
      author: 'happyamy2016',
      votes: 17,
      created_at: 1489789669732
    },
    {
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      article_id: 29,
      author: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }]
    expect(formatComments(actual, articleRef)).to.eql(expected);
  });
  it('doesnt mutate the array passed into the fucntion', () => {
    const actual = [{
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      created_by: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }];
    const articleRef = { 'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 };
    const expected = [{
      body: 'Corporis magnam placeat quia nulla illum nisi. Provident magni aut et earum illo labore aperiam. Dolorem ipsum dignissimos est ex. Minima voluptatibus nihil commodi veritatis. Magnam aut suscipit dignissimos nostrum ea.',
      belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
      created_by: 'weegembump',
      votes: 3,
      created_at: 1504946266488
    }];
    formatComments(actual, articleRef)
    expect(actual).to.eql(expected)
  });
});
