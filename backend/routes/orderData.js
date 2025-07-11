const express = require("express");
const router = express.Router();
const order = require("../models/order");

router.post("/orderdata", async(req, res) =>{
    let data = req.body.order_data;
    await data.splice(0, 0, {Order_date: req.body.order_date});

    let eId  = await order.findOne({"email": req.body.email});
    if(eId === null){
        try {
            await order.create({
                email: req.body.email,
                order_data: [data]
            });
            res.json({success: true})
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Server error: " + error.message);
        }
    }

    else{
        try {
            await order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.json({ success: true });
        } catch (error) {
            console.log(error.message);
            res.status(500).send("Server error: " + error.message);
        }
    }
})

router.post("/myorderdata", async(req, res) => {
    try {
        let myData = await order.findOne({"email": req.body.email})
        res.json({orderData: myData})
    } catch (error) {
        res.send("Server Error", error.message)
    }
    
})

module.exports = router;