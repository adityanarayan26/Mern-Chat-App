import User from "../models/UserModel.js"

export const user = async (req, res) => {
    try {
        const LoggedinUser = req.user._id
        const FilteredUser = await User.find({ _id: { $ne: LoggedinUser } })
        return res.status(200).json(FilteredUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

