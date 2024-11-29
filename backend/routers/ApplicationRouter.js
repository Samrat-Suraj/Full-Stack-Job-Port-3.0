import express from "express"
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/ApplicationController.js";
import { ProtectRouter } from "../middleware/ProtectRouter.js";
const router = express.Router()


router.post("/apply/:id",ProtectRouter, applyJob);
router.get("/get",ProtectRouter, getAppliedJobs);
router.get("/:id/applicants",ProtectRouter, getApplicants);
router.post("/status/:id/update",ProtectRouter, updateStatus);

export default router