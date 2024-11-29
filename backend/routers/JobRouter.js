import express from "express"
import { ProtectRouter } from "../middleware/ProtectRouter.js";
import { getAllJobs, getJobById, getJobByLoggedAdminUser, postJob } from "../controllers/JobController.js";
const router = express.Router()

router.post("/postjob",ProtectRouter, postJob);
router.get("/all",ProtectRouter, getAllJobs);
router.get("/getadminjobs",ProtectRouter, getJobByLoggedAdminUser);
router.get("/:id",ProtectRouter, getJobById);

export default router