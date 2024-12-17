const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://Abhishek:Situ%40123@cluster0.l6kef.mongodb.net/gofoodmy-app";

const mongodb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected");

    const db = mongoose.connection.db;

    // Fetch data from 'food_items' collection
    const foodItems = await db.collection("food_items").find({}).toArray();

    // Fetch data from 'foodCategory' collection
    const foodCategory = await db.collection("foodCategory").find({}).toArray();

    // Assigning to global variables
    global.food_items = foodItems;
    global.foodCategory = foodCategory;

    console.log("Data fetched and assigned to global variables");

  } catch (err) {
    console.log("--- Error: ", err);
  }
};

module.exports = mongodb;
