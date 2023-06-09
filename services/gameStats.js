const { gameStats, validate } = require('../models/gameStats');
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

exports.update = async league => {
    const isDataStale = time => dayjs().diff(dayjs(time), 'second') > 15;

    latest = await gameStats.findOne({league: league}).sort({_id: -1});

    if (latest == null || isDataStale(latest.updatedAt)) {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
              },
            };
    
        const url = {
            MLB: 'https://chumley.barstoolsports.com/dev/data/games/eed38457-db28-4658-ae4f-4d4d38e9e212.json',
            NBA: 'https://chumley.barstoolsports.com/dev/data/games/6c974274-4bfc-4af8-a9c4-8b926637ba74.json',
        }

        let response = await fetch(url[league], options);
        response = await response.json();
    
        let entry = {
            instance: response,
            league: league,
        };

        const {error} = validate(entry);

        if (!error) {
            await gameStats.create(entry);
        } else {
            console.error(error);
        }

        return entry;
    }

    return latest;
}
