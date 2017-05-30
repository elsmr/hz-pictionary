const words = require('../data/words.json');

module.exports = {
  getRandomWord: () => words[Math.floor(Math.random() * words.length)],
};
