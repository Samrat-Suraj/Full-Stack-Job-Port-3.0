import validator from "validator"
import User from "../model/UserModel.js"
import bcrypt from "bcryptjs"
import GenTokenAndSetCookie from "../utils/GenTokenAndSetCookie.js"
import DataUri from "../utils/DataUri.js"
import cloudinary from "../config/Cloudinary.js"

export const RegisterUser = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body
        let profilePic = req.file
        if (!fullname || !email || !password || !phoneNumber || !role ||!profilePic) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email Addresss" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exists Please Try Another Email Address" })
        }


        let fileuri = DataUri(profilePic)
        let cloudResponse = await cloudinary.uploader.upload(fileuri)


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
            profile: {
                profilePic: cloudResponse.secure_url,
            }
        })

        if (newUser) {
            await newUser.save()
            GenTokenAndSetCookie(newUser._id, res)
            return res.status(201).json({
                success: true, message: "User Registered Successfully", user: {
                    ...newUser._doc,
                    password: null
                }
            })
        }

    } catch (error) {
        console.log("Error in RegisterUser Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({ success: false, message: "All Fields are required" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email Addresss" })
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Please Register Your Account" })
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.status(400).json({ success: false, message: "Invalid Password Please Enter Correct Password" })
        }

        if (role !== user.role) {
            return res.status(400).json({ success: false, message: "Invalid Role Please Select Correct Role" })
        }

        GenTokenAndSetCookie(user._id, res)
        return res.status(200).json({
            success: true, message: "User Logged In Successfully", user: {
                ...user._doc,
                password: null
            }
        })

    } catch (error) {
        console.log("Error in Login Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const Logout = async (req, res) => {
    try {
        res.clearCookie("job")
        return res.status(200).json({ success: true, message: "User Logged Out Successfully" })
    } catch (error) {
        console.log("Error in Logout Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user
        let { fullname, phoneNumber, bio, skills , dob, city } = req.body;

        let profilePic = req.files && req.files.profilePic ? req.files.profilePic[0] : null;
        let resume = req.files && req.files.resume ? req.files.resume[0] : null;
    

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        if (profilePic) {
            if (user.profile.profilePic) {
                const oldPublicId = user.profile.profilePic.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(oldPublicId)
            }
            let fileuri = DataUri(profilePic)
            let cloudResponse = await cloudinary.uploader.upload(fileuri)
            user.profile.profilePic = cloudResponse.secure_url
        }
        if (resume) {
            if (user.profile.resume) {
                const oldPublicId = user.profile.resume.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(oldPublicId)
            }
            
            let fileuri = DataUri(resume)
            let cloudResponse = await cloudinary.uploader.upload(fileuri)
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = resume.originalname
        }


        user.fullname = fullname || user.fullname;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.profile.bio = bio || user.profile.bio;

        if (skills) {
            user.profile.skills = skills.split(",")
        }

        user.profile.dob = dob || user.profile.dob;
        user.profile.city = city || user.profile.city;

        await user.save()
        return res.status(200).json({
            success: true, message: "Profile Updated Successfully", user: {
                ...user._doc,
                password: null
            }
        })

    } catch (error) {
        console.log("Error in updateProfile Controller", error.message)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}