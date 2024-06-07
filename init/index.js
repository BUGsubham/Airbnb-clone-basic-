const mongoose = require("mongoose");
const initData = require("./data.js");
require("dotenv").config({ path: "../.env" });
const Listing = require("../models/listings.js");

main();
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

async function initDb() {
  await Listing.deleteMany({});
//   // await Listing.insertMany(initData.data);
  try {
    initData.data.forEach(async (listing) => {
      let newlisting = new Listing({
        title: listing.title,
        description: listing.description,
        image: listing.image.url,
        price: listing.price,
        location: listing.location,
        country: listing.country,
      });
      await newlisting.save();
    });
  } catch (error) {
        console.error(`Error saving listing data: ${error}`);
      }
      console.log("Data has been initialized");
};


initDb();