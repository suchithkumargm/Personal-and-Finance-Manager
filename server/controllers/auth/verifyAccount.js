import crypto from 'crypto';

import { sendEmail } from './sendEmail.js';
import Token from '../../models/Token.js';
import User from '../../models/User.js';

const generateToken = () => {
    return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async (email, userName) => {
    const token = new Token({
        userName: userName,
        email: email,
        token: generateToken()
    })

    const emailResult = await sendEmail(email, userName, token.token);

    await token.save();
}

export const verifyAccount = async (req, res) => {
    const userName = req.query.userName;
    const token = req.query.token;

    try {
        // Find the token data for the given username
        const tokenData = await Token.findOne({ userName });

        // Check if the token matches
        if (tokenData && tokenData.token === token) {
            // Delete the token
            await Token.findOneAndDelete({ userName });

            // Update the user's verification status
            await User.findOneAndUpdate({ userName }, { verified: true });

            return res.status(200).send("<h1 style=''>Account verified successfully<h1>");
        } else {
            return res.status(400).send('Invalid token or user');
        }
    } catch (error) {
        return res.status(500).send('Server error');
    }
};

export const checkVerification = async (req, res) => {
    const userName = req.body.userName;
    if (!userName) {
        return res.status(400).send('user name empty');
    }

    const user = await User.findOne({ userName });
    if (!user) {
        return res.status(404).send('user does not exist');
    }

    let verified = false;
    if (user.verified) {
        verified = true;
        return res.status(200).json({ verified, message: 'user is already verifed' });
    } else {
        let userToken = await Token.findOne({ userName });
        if (userToken) {
            console.log('user', user.email, user.userName, userToken.token)
            await sendEmail(user.email, user.userName, userToken.token);
            return res.json({ verified, mesage: 'Verification email sent again' });
        } else {
            console.log('user', user.email, user.userName)
            await sendVerificationEmail(user.email, user.userName)
            return res.json({ verified, message: 'Verification email sent' });
        }
    }

}