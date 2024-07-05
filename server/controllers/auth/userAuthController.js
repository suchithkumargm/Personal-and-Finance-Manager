import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../models/User.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Route to register a new user
export const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if a user with the same userName and email already exists
        let existingUserEmail = await User.findOne({ email: req.body.email });
        let existingUserName = await User.findOne({ userName: req.body.userName });

        if (existingUserEmail) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists!" });
        }
        if (existingUserName) {
            return res.status(400).json({ error: "Sorry, a user with this UserName already exists!" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user record in the database
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
            PIN: req.body.PIN,
            photo: req.body.photo,
            assets: req.body.assets,
            liabilities: req.body.liabilities,
            cash: req.body.cash,
        });

        // Create an authentication token (JWT) for the new user
        const data = {
            user: {
                userName: user.userName,
            },
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({ authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
