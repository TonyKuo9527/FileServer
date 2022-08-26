const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const app = express();

require('dotenv').config();

const port = process.env.port;

const file = require('./routes/file');

app.use(router);
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

app.use('/file', file);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});