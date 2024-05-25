const mongoose = require('mongoose');
const initData = require('./data.js');
require('dotenv').config({path: "../.env"});
const Listing = require('../models/listings.js');

main();
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    };
};

async function initDb() {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Database initialized');
};

initDb();