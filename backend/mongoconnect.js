const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://hsharma4090:gofoodmern0987@cluster0.yjl7ug4.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0"
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
