import jwt from 'jsonwebtoken';

import User from '../../models/User.js';

export const checkLoginPinSetStatus = async (req, res) => {

    const token = jwt.verify(req.header('authToken'), process.env.JWT_SECRET);
    const userName = token.user.userName;
    const user = await User.findOne({ userName });
    if (!user.PIN) {
        return res.json({ pinSet: false });
    }
    return res.json({ pinSet: true });
}