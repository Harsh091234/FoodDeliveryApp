const express = require("express");
const app = express();
const PORT = 3000;
const connectToMongodb  = require("./mongoconnect");
const userRouter = require("./routes/createuser");

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();

})

app.use(express.json());
// app.use(express.urlencoded({extended: false}))

connectToMongodb();
app.use("/api", userRouter);

app.get("/", (req, res) => {
    res.send("hello")
})


app.listen(PORT, () => console.log(`Listened at port: ${PORT}`));