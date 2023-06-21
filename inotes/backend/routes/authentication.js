const express = require('express');
const router = express.Router();
const User= require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// const JWT_SECRET_STRING = process.env.JWT_SECRET_STRING 
const JWT_SECRET_STRING = "nischalKhatiwada@77";

// Route 1: create a User using: POST "api/authentication/createuser". No login required
router.post('/createuser', [
    body('email','Enter valid email').isEmail(),
    body('name','Enter valid name').isLength({ min: 3}),
    body('password').isLength({ min: 5}),
],async (req, res)=>{
    // If there are errors, return the errors
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
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt)

    user = await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
    })

    const data={
        user:{
            id: user.id
        }
    }
    const authenticationToken = jwt.sign(data, JWT_SECRET_STRING);
    res.json(authenticationToken)

} catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
}
})

// Route 2: Authenticate a User using: POST "api/authentication/login". No login required
router.post('/login', [
    body('email','Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],async (req, res)=>{
    // If there are errors, return the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
    } 

    const {email, password}=req.body;
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.send({ errors: "Please login with correct credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.send({ errors: "Please login with correct credentials." });
        }
        
        const data={
            user:{
                id: user.id
            }
        }
        const authenticationToken = jwt.sign(data, JWT_SECRET_STRING);
        res.json(authenticationToken)

    }catch(error){
        console.error(error.message);
        res.status(500).send("Error");
    }

})

// Route 3: Get loggedin User details using: POST "api/authentication/getUsers".login required
router.post('/getUsers', fetchuser, [
],async (req, res)=>{
try {
    userId= req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Error");
}
})

module.exports=router