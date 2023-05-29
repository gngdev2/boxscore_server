require('dotenv').config();
require('./database/database.js').connect();

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors({origin: ['http://localhost:3000']}));

const port = process.env.PORT || 4000;

const router = require('./routes/index');

/* GET home page. */
app.get('/', function(req, res) {
  res.send({ message: 'Express' });
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
