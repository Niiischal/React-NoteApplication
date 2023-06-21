const jwt = require('jsonwebtoken');
// const jwtSecretString = process.env.JWT_SECRET_STRING 
const JWT_SECRET_STRING = "nischalKhatiwada@77";

const fetchuser=(req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('authentication-token')
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data =  jwt.verify(token, JWT_SECRET_STRING)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
}
module.exports= fetchuser;