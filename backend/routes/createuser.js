const express = require("express");
const user = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();
const { body, validationResult } = require("express-validator")




router.post("/createuser", [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),
    body("name").isLength({ min: 3 })

], async (req, res) => {
    const errors = validationResult(req);


    try {
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        const { name, password, email, address, location } = req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) console.log(err);
                else {
                    await user.create({
                        name: name,
                        password: hash,
                        email: email,
                        address: address,
                        location: location
                    });
                    res.status(201).json({ success: true });
                }
            })
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });

    }
});

//login
router.post("/loginuser", [
    body("email").isEmail(),
    body("password", "Incorrect password").isLength({ min: 5 }),

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const { password, email } = req.body;
        let userData = await user.findOne({ email });
        if (!userData) return res.status(400).json({ errors: "Try loggings with correct credentials" });
        
        const pwdCompare = bcrypt.compare(password, userData.password);
        if(!pwdCompare) return res.status(400).json({ errors: "Try loggings with correct credentials" });

        const data = {
            user: {
                id: userData.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        return res.json({success: true, authToken: authToken});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false });

    }
});

module.exports = router;