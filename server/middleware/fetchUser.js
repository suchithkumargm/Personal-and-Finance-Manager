//middleware to ensure that the user is logged in before accessing certain routes
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
//fetch JWT secret string from .env file
const JWT_SECRET = process.env.JWT_SECRET;

const fetchCustomer = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('authToken');     //get the auth token from header of a req
    //if authToken is not present then produce error
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

export default fetchCustomer;