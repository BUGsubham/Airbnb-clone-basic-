// 
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

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

app.listen(process.env.Port, () => {
    console.log(`Server is running on port ${process.env.Port}`);
});

