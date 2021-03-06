'use strict';
const express = require('express');
const router = express.Router();
const Playlist = require('../db/controller/playlist');
const helper = require('../helper');

/* eslint-disable */

router.get('/', helper.authenticated, (req, res) => {
  let userId = req.user.dataValues.spotify_id;

  Playlist.findByUserId(userId)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.post('/', helper.authenticated, (req, res) => {
  let playlist = {
    name: req.body.title,
    user_id: req.user.dataValues.spotify_id
  };

  Playlist.newPlaylist(playlist)
    .then((data) => {
      res.status(201);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.put('/', helper.authenticated, (req, res) => {
  let pid = req.body.pid;
  let title = req.body.title;

  Playlist.updatePlaylist(pid, title)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.get('/:pid', (req, res) => {
  let pid = req.params.pid;

  Playlist.getAllTracks(pid)
    .then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.delete('/:pid', helper.authenticated, (req, res) => {
  let pid = req.params.pid;

  Playlist.deletePlaylist(pid)
    .then((data) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;