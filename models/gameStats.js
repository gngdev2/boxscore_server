const mongoose = require('mongoose');
const Joi = require('joi');

const gameStatsSchema = new mongoose.Schema({
    instance: {type: Object, default: {}},
    league: {type: String},
}, {timestamps: true})

const gameStats = mongoose.model('gameStats', gameStatsSchema);

const validate = (gameStats) => {
    const schema = Joi.object({
        instance: Joi.object().required(),
        league: Joi.string().required(),
    });

    return schema.validate(gameStats);
}

module.exports = {gameStats, validate};