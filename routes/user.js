const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SALT_ROUNDS = 12;

//POST: Create a new user
router.post('/api/users',async (req, res) => {
    //encrypt the password
    bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hash) => {
        let newUser = new User({
            name:req.body.name,
            email:req.body.email,
            password:hash
        });

        let userCreated = await newUser.save();
        if(!userCreated) res.status(500).send("could not create user");

        //create a json web token
        let jwtToken = jwt.sign({name:req.body.name, email:req.body.email}, "secret");

        res.status(200).send({userCreated: true, token: jwtToken});
    });
});


module.exports = router;