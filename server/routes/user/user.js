import express from 'express';

import fetchUser from '../../middleware/fetchUser.js'
import { fetchUserDetails } from '../../controllers/user/userController.js';

const router = express.Router();

// ROUTE 1: fetch user details: POST "/user/fetch-user-details". login required
router.post(
    '/fetch-user-details',
    fetchUser,
    fetchUserDetails
);

export default router;