import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';
import { config } from 'dotenv';
config()
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'unauthorized user' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: 'unauthorized user' })
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            res.status(404).json({ message: ' user not found' })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'server error' })
    }
}