const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const Track = require('../db/controller/track');


router.post('/', (req, res) => {
  const q = req.body.q;
  const userToken = req.user.access_token;

  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/search?q=${q}&type=track&limit=7`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`
    }
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.send(err);
  });
});

router.post('/:pid', (req, res) => {
  const pid = req.params.pid;
  const artist = req.body.artist;
  const album = req.body.album;
  const track = req.body.track;

  Track.newTrack(artist, album, track, pid)
    .then((data) => {
      Track.findTrack(data[0][0].dataValues.track_id)
        .then((data) => {
          res.send(data);
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete('/:pid', (req, res) => {
  const pid = req.params.pid;
  const tid = req.query.tid;

  Track.deleteTrack(tid, pid)
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;