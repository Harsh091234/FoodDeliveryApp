const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT | 3000;
const connectToMongodb  = require("./mongoconnect");
const userRouter = require("./routes/createuser");
const displayRouter = require("./routes/displaydata");
const orderRouter = require("./routes/orderData");
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://food-delivery-app-three-mu.vercel.app");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }
    next();
})

app.use(express.json());
// app.use(express.urlencoded({extended: false}))

connectToMongodb();
app.use("/api", userRouter);
app.use("/api", displayRouter);
app.use("/api", orderRouter);
app.get("/", (req, res) => {
    res.send("hello")
})


app.listen(PORT, () => console.log(`Listened at port: ${PORT}`));
