import express from 'express';
import { body } from 'express-validator';

import { registerUser, loginUser } from '../../controllers/auth/userAuthController.js';

const router = express.Router();

// ROUTE 1: Register a User using: POST "/auth/user/register". No login required
router.post(
    '/register',
    [
        body('name', 'Enter a valid name').isLength({ min: 5 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
        body('userName', 'user name must be at least 3 characters').isLength({ min: 3 }),
    ],
    registerUser
);

// ROUTE 2: Login User using: POST "/auth/user/login". No login required
router.post(
    '/login',
    [
        body('userName', 'user name must be at least 3 characters').isLength({ min: 3 }),
        body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
    ],
    loginUser
);

export default router;