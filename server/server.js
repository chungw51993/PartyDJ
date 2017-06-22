const express = require('express');
const path = require('path');

const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
})

app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => {
  console.log('Server is listening on ', port);
})