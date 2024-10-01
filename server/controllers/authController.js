import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import generatetokenandsetcookie from "../utils/GenerateToken.js";



export const signup = async (req, res) => {

    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ error: 'password donot match' })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ error: 'username already exist ' })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // const verificationToken = Math.floor(100000 + Math.random() * 900000); <=== if want to create advance auth for email
        //https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        // const girlPsrofilePic = `https://avatar.iran.liara.run/username?username=${fullname}`

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            verificationToken,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic
        })

        if (newUser) {


            await newUser.save()
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user: {
                    ...newUser._doc,
                    password: undefined
                }
            })
        }

        else {
            return res.status(400).json({ error: 'invalid user data' })
        }
    }
    catch (err) {
        console.log('error in signing up', err);

        return res.status(500).json({ err: 'error occured' })
    }
}


export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isValidPassword = await bcrypt.compare(password, user?.password || "")
        if (!user || !isValidPassword) {
            return res.status(400).json({ error: 'invalid username or password' })
        }
        user.ifVerified = true
        generatetokenandsetcookie(user._id, res);
        user.save()
        return res.status(201).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            isverified: user.ifVerified,
            profilePic: user.profilePic,
        })
    } catch (error) {
        console.log('error while logging in', error)
        return res.status(500).json({ error: 'error occured' })

    }
}



export const logout = (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('jwt', '', {
            maxAge: 0, // Remove the cookie immediately
            httpOnly: true, // Prevent XSS attacks
            secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
            sameSite: 'strict' // Prevent CSRF attacks
        });


        return res.json({ message: 'logged out successfully' });
    } catch (error) {
        console.log('error while logging out', error);
        return res.status(500).json({ error: 'error occurred' });
    }
};