const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const Track = require('../db/controller/track');


router.post('/', (req, res) => {
  let q = req.body.q;
  let userToken = req.user.access_token;

  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/search?q=${q}&type=track&limit=5`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${userToken}`
    }
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.error(err);
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