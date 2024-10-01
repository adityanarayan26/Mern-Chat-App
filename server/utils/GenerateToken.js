import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('Internal Server Error');
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevent XSS attacks
        sameSite: 'strict', // Prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development' // Use secure cookies in production
    });


    
};

export default generateTokenAndSetCookie;