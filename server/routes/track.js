const express = require('express');
const router = express.Router();
const Track = require('../db/controller/track');

router.post('/:pid', (req, res) => {
  let pid = req.params.pid;
  let artist = req.body.artist;
  let album = req.body.album;
  let track = req.body.track;

  Track.newTrack(artist, album, track, pid)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.delete('/:pid', (req, res) => {
  let pid = req.params.pid;
  let tid = req.body.tid;

  Track.deleteTrack(tid, pid)
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;