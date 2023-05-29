require('dotenv').config();
const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

exports.connect = () => {
    mongoose
    .connect(MONGO_URI)
    .then(() => console.log('connected'))
    .catch((error) => {
        console.log('failed');
        console.error(error);
        process.exit(1);
    })
}