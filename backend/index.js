const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT | 3000;
const connectToMongodb  = require("./mongoconnect");
const userRouter = require("./routes/createuser");
const displayRouter = require("./routes/displaydata");
const orderRouter = require("./routes/orderData");
app.use((req, res, next) => {
  const allowedOrigin = process.env.FRONTEND_URI_LOCAL ||
   FRONTEND_URI_REMOTE;

  // Handle preflight requests
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");

  // Preflight requests end here
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

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
