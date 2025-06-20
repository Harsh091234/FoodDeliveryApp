const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://hsharma4090:gofoodmern0987@cluster0.yjl7ug4.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongodb = async() => {
await mongoose.connect(MONGO_URI).then(() => console.log("Mongodb connected"));
const fetched_data = mongoose.connection.db.collection("foodItems");  
const data = await fetched_data.find({}).toArray(); 




}
module.exports = connectToMongodb;
