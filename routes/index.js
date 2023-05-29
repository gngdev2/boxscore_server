const router = require('express').Router();
const bodyParser = require('body-parser');
const gameStatsController = require('../controllers/gameStats');

const jsonParser = bodyParser.json();

router.get('/game-stats/get', jsonParser, gameStatsController.get);

module.exports = router;