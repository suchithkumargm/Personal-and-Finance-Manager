import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import User from '../../models/User.js';
import { sendVerificationEmail } from './verifyAccount.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Route to register a new user
export const registerUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if a user with the same userName and email already exists
        let existingUserEmail = await User.findOne({ email: req.body.email });
        let existingUserName = await User.findOne({ userName: req.body.userName });

        if (existingUserEmail) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: "Sorry, a user with this email already exists!" });
        }
        if (existingUserName) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: "Sorry, a user with this UserName already exists!" });
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user record in the database
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: hashedPassword,
            PIN: req.body.PIN,
            profilePhoto: req.body.profilePhoto,
            assets: req.body.assets,
            liabilities: req.body.liabilities,
            cash: req.body.cash,
        });

        await newUser.save({ session });

        // Create an authentication token (JWT) for the new user
        const data = {
            user: {
                userName: newUser.userName,
            },
        };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        res.json({ authToken });

        await sendVerificationEmail(newUser.email, newUser.userName)

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();
    } catch (error) {
        // Rollback the transaction on error
        await session.abortTransaction();
        session.endSession();

        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

// Route to authenticate a user
// Route to authenticate a user
export const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ userName });

        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Compare the entered password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }

        // Create an authentication token (JWT) for the authenticated user
        const data = {
            user: {
                userName: user.userName,
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        res.json({ authToken });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
