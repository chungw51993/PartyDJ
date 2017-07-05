const express = require('express');
const router = express.Router();
const Playlist = require('../db/playlist');

router.get('/:uid', (req, res) => {
  let userId = req.params.uid;

  Playlist.findByUserId(userId)
    .then((data) => {
      res.setStatus(200);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.post('/', (req, res) => {
  let playlist = req.body.playlist;

  Playlist.newPlaylist(playlist)
    .then((data) => {
      res.sendStatus(201);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    })
})

module.exports = router;