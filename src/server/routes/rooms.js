const express = require('express');
const roomService = require('../services/rooms');

const router = express.Router();

router.get('/:name', (req, res) => {
  const name = req.params.name;
  const db = req.app.rdbConnection;
  const hz = req.app.hz;

  roomService.getRoom(hz, db, name)
    .then(room => console.log(room))
    .then(room => res.send(room))
    .catch(err => res.status(404).send({ error: err }));
});

module.exports = router;
