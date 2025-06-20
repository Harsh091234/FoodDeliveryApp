const mongoose = require("mongoose");


const connectToMongodb = async() => {
await mongoose.connect(MONGO_URI).then(() => console.log("Mongodb connected"));
const fetched_data = mongoose.connection.db.collection("foodItems");  
const data = await fetched_data.find({}).toArray(); 




}
module.exports = connectToMongodb;
