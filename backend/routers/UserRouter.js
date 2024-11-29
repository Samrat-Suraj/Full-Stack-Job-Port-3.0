import express from "express"
import { Login, Logout, RegisterUser, updateProfile } from "../controllers/UserController.js"
import upload from "../utils/multer.js"
import { ProtectRouter } from "../middleware/ProtectRouter.js"
const router = express.Router()

router.post("/register", upload.single("profilePic"), RegisterUser)
router.post("/login", Login)
router.post("/logout", Logout)

router.post("/profile/update", ProtectRouter,
    upload.fields([{name : "profilePic"} , {name : "resume"}]),
    updateProfile
);

export default router