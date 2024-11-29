import express from "express"
import { getCompany, getCompanyById, registerCompany, updateCompanyInformation } from "../controllers/CompanyController.js";
import { ProtectRouter } from "../middleware/ProtectRouter.js";
import upload from "../utils/multer.js";
const router = express.Router()

router.post("/register",ProtectRouter, registerCompany);
router.get("/getcompany",ProtectRouter,getCompany);
router.get("/getcompany/:id",ProtectRouter,getCompanyById);
router.put("/update/:id",ProtectRouter ,upload.single("logo"),updateCompanyInformation);


export default router