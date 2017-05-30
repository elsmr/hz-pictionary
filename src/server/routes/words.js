const express = require('express');
const wordService = require('../services/words');

const router = express.Router();

router.get('/random', (req, res) => {
  res.json({ word: wordService.getRandomWord() });
});

module.exports = router;
