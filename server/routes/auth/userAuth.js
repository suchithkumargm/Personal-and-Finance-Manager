import express from 'express';
import { body } from 'express-validator';

import { registerUser } from '../../controllers/auth/userAuthController.js';

const router = express.Router();

// ROUTE 1: Register a User using: POST "/auth/user/register". No login required
router.post(
    '/register',
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
        body('userName', 'user name must be at least 5 characters').isLength({ min: 3 }),
        body('PIN', 'PIN must be of 4 digits').isLength({ min: 4 }),
    ],
    registerUser
);

export default router;