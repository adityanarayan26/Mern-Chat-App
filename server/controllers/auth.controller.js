import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import cloudinary from '../lib/cloudinary.js'


export const signup = async (req, res) => {
    console.log('Request body:', req.body);
    const { fullName, email, password } = req.body
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Invalid user data' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const NewUser = new User({
            fullName,
            email,
            password: hashPassword
        })
        if (NewUser) {
            //generate token
            generateToken(NewUser._id, res)
            await NewUser.save()
            res.status(201).json({
                _id: NewUser._id,
                fullName: NewUser.fullName, email: NewUser.email,
                profilePic: NewUser.profilePic
            })
        }
        else {
            res.status(400).json({ message: 'invalid user data' })
        }

    } catch (error) {
        console.log('Error in signing up:', error.message);
        res.status(500).json({ message: 'Server Error' });

    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'invalid credentials' })
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'invalid credentials' })
        }
        generateToken(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log('error logging in ', error.message);
        res.status(500).json({ message: 'server error' })

    }
}
export const logout = async (req, res) => {
    try {
        res.cookie('token', "", { maxAge: 0 })
        res.status(200).json({ message: 'logout successfully' })
    } catch (error) {
        console.log('error logging out ', error.message);
        res.status(400).json('error logging out')

    }
}
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            res.status(400).json({ message: 'profile pic is required' })
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic, { folder: "mernchatapp" })
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log('error uploading response');
        res.status(500).json('internal server error')

    }
}
export const updateFullNameAndEmail = async (req, res) => {
    try {
        const { fullName, password } = req.body
        const userId = req.user._id
        if (!fullName || !password) return;
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const UpdatedVersion = await User.findByIdAndUpdate(userId, { fullName: fullName, password: hashPassword }, { new: true })
        res.status(200).json(UpdatedVersion)
    } catch (error) {
        console.log('error updating fullname and password ', error);
        res.status(500).json('internal server error')
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('error in checkauth controller', error.message);
        res.status(500).json({ message: 'internal server error' })

    }
}

export const deleteAccount = async (req, res) => {
    try {
        const userId = req.user._id
        await User.findByIdAndDelete(userId)
        res.cookie('token', "", { maxAge: 0 })
        res.status(200).json({ message: 'Account deleted successfully' })
    } catch (error) {
        console.log('error deleting account', error.message);
        res.status(500).json({ message: 'internal server error' })
    }
}