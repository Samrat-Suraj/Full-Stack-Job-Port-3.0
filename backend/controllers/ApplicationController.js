import Job from "../model/JobModel.js";
import User from "../model/UserModel.js";
import Application from "../model/ApplicationModel.js";

export const applyJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false });
        }

        const newApplication = new Application({
            job: jobId,
            applicant: userId,
            status: "pending"
        })

        await newApplication.save()
        await Job.findByIdAndUpdate(jobId, { $push: { applications: newApplication._id } })
        return res.status(200).json({ success: true, message: "Applied Successfully", application: newApplication });

    } catch (error) {
        console.log("Error in applyJob controllers", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user._id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } }
            }
        });

        if (!applications) {
            return res.status(404).json({ success: false, message: "No Applications found" });
        }

        return res.status(200).json({ success: true, applications });
    } catch (error) {
        console.log("Error in getAppliedJobs controllers", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getApplicants = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        });
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        console.log("Error in getApplicants controllers", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicantId = req.params.id;
        if (!status) {
            return res.status(400).json({ success: false, message: "Status is required" });
        }
        const application = await Application.findById({ _id: applicantId })
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = status.toLowerCase() || application.status;
        await application.save();
        return res.status(200).json({ success: true, message: "Status Updated Successfully", application });

    } catch (error) {
        console.log("Error in updateStatus controllers", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}