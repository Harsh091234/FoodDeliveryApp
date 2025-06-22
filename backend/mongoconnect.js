const mongoose = require("mongoose");


const connectToMongodb = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongodb connected");

        const foodItemsCollection = mongoose.connection.db.collection("foodItems");
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

        const foodItems = await foodItemsCollection.find({}).toArray();
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        global.food_items = foodItems;
        global.foodCategory = foodCategories;
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = connectToMongodb;
