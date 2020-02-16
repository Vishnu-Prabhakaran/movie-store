const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 4000;
const db = require('./db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'Mongodb Connection Error:'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
