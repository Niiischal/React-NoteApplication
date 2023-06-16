const express = require('express');
const router = express.Router();
const User= require('../models/User');
const { query, validationResult, body } = require('express-validator');

// create a user using: POST "api/authentication/". Doesn't require Authentication
router.post('/', [
    body('email','Enter valid email').isEmail(),
    body('name','Enter valid name').isLength({ min: 3}),
    body('password').isLength({ min: 5}),
],(req, res)=>{
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    } 
    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user => res.json(user));
})

module.exports=router