const express = require("express");
const user = require("../models/user")

const router = express.Router();
const {body, validationResult} = require("express-validator")




router.post("/createuser", [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({min: 5}),
    body("name").isLength({min: 3})

], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()} );
    try {
        const {name, password, email, address, location} = req.body;
        await user.create({
            name: name,
            password: password,
            email: email,
            address: address,
            location: location
        });
        res.status(201).json({ success: true });
    } catch (error) {
            console.log(error);
        res.status(500).json({ success: false});
        
    }
});

module.exports = router;