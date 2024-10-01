import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    ifVerified: {
        type: Boolean,
        default: false
    },
    lastlogin: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: ""
    },
    resetpasswordToken: String,
    resetpasswordExpireAt: Date,
    verificationToken: String,
    verificationExpireAt: Date
}, { timestamps: true })


const User = mongoose.model('Persons', userSchema)

export default User;