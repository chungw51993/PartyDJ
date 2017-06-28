const express = require('express');
const path = require('path');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../')));

const users = require('./routes/user');
app.use('/api/user', users);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.listen(port, () => {
  console.log('Server is listening on ', port);
})