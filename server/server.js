const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const db = require('./db/index');

const port = 8000;

require('./passport/init')(passport);

app.use(cookieParser());
app.use(session({ secret: 'keyboard cat!' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../')));

const users = require('./routes/user')(passport);
const playlist = require('./routes/playlist');
const track = require('./routes/track');

app.use('/api/user', users);
app.use('/api/playlist', playlist);
app.use('/api/track', track);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

const socketListener = require('./socket.js');
io.on('connection', socketListener);

db.sequelize.sync().then(function() {
  db.sequelize.query('ALTER TABLE `partyDJ`.`Playlist_Track` DROP PRIMARY KEY')
    .then((data) => {
      console.log('Playlist_Track table has been altered');
    })
    .catch((err) => {
      console.log('Playlist_Track was already altered');
    });

  server.listen(port, () => {
    console.log('Server is listening on ', port);
  });
});