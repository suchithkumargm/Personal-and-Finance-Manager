import jwt from 'jsonwebtoken';

import User from '../../models/User.js';

export const checkLoginPinSetStatus = async (req, res) => {

    const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
    const userName = decoded.user.userName;
    const user = await User.findOne({ userName });
    if (!user.PIN) {
        return res.json({ pinSet: false });
    }
    return res.json({ pinSet: true });
}

export const setPin = async (req, res) => {
    const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
    const userName = decoded.user.userName;
    const user = await User.findOneAndUpdate(
        { userName },
        { $set: { PIN: req.body.PIN } },
    );
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ pinSet: true });
}

export const checkPin = async (req, res) => {
    const decoded = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
    const userName = decoded.user.userName;
    const user = await User.findOne({ userName });
    if (user.PIN === req.body.PIN) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(400).json({ success: false })
    }
}