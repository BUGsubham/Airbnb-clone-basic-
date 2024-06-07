// 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const Listing = require('./models/listings.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public'))) // Serve static files
    .use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
    .set('view engine', 'ejs') // Set view engine to EJS
    .set('views', path.join(__dirname, 'views')); // Set views directory

// Connect to MongoDB
main();
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    };
};

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { listings: allListings });
});

app.get("/listings/:id", async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', {listing})
});

app.listen(process.env.Port, () => {
    console.log(`Server is running on port ${process.env.Port}`);
});

