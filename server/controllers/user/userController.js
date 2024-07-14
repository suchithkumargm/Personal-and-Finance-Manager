import dotenv from 'dotenv';

import User from '../../models/User.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

// Route to get details of logged-in  user
export const fetchUserDetails = async (req, res) => {
    const userName = req.body.userName;

    try {
        let user = await User.findOne({ userName });

        if (!user) {
            return res.status(404).json({ error: "user does not exist" });
        }
        return res.status(200).json({
            name: user.name,
            userName: user.userName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            verified: user.verified
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
