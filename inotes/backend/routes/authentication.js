const express = require('express');
const router = express.Router();
const User= require('../models/User');
const { query, validationResult, body } = require('express-validator');

// create a User using: POST "api/authentication/createuser". No login required
router.post('/createuser', [
    body('email','Enter valid email').isEmail(),
    body('name','Enter valid name').isLength({ min: 3}),
    body('password').isLength({ min: 5}),
],async (req, res)=>{
    // If there are errors, return and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    } 
    // Check whether the user with this email exists already
    try{
    let user =await User.findOne({email: req.body.email})
    if(user){
        return res.send({ error: "User with this email already exists"});
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    res.json(user)
} catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
})

module.exports=router