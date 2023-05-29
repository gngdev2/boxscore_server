const {update} = require('../services/gameStats')

exports.get = async (req, res) => {
    const league = req.query.league?.toUpperCase() ?? 'MLB';

    try {
        res.status(201).json(await update(league));
    } catch(err) {
        console.error(err);
    }
};