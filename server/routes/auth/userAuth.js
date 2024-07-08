import express from 'express';
import { body } from 'express-validator';

import { registerUser, loginUser } from '../../controllers/auth/userAuthController.js';
import { verifyAccount, checkVerification } from '../../controllers/auth/verifyAccount.js';

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

// ROUTE 3: Send Verification link to user email using: GET "/auth/user/verify-account". No login required
router.get(
    '/verify-account',
    verifyAccount
);

// ROUTE 4: check if account is verified  using: GET "/auth/user/check-verification". No login required
router.get(
    '/check-verification',
    checkVerification
);

export default router;