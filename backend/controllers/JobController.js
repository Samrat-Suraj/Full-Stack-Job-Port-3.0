import Job from "../model/JobModel.js";

export const postJob = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, description, requirements, location, salary, jobType, experienceLevel, position , companyId } = req.body;
        if(!title || !description || !location || !salary || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({ success : false, message: "All fields are required" });
        }
        const job = new Job({
            title,
            description,
            requirements : requirements.split(","),
            location,
            salary,
            jobType,
            experienceLevel,
            position,
            company : companyId,
            createdBy : userId
        });

        await job.save();
        return res.status(201).json({ success : true, message: "Job posted successfully", job });

    } catch (error) {
        console.log("Error in postJob controller", error.message);
        return res.status(500).json({ success : false, message: "Internal server error" });
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or : [
                { title : {$regex : keyword , $options : "i"} },
                { description : {$regex : keyword , $options : "i"}}
            ]
        }

        const jobs = await Job.find(query).populate({ path : "company"}).sort({createdAt : -1});
        if(!jobs){
            return res.status(404).json({ success : false, message: "No jobs found" });
        }
        return res.status(200).json({ success : true, jobs });

    } catch (error) {
        console.log("Error in postJob controller", error.message);
        return res.status(500).json({ success : false, message: "Internal server error" });
    }
}

export const getJobByLoggedAdminUser = async (req, res) => {
    try {
        const userId = req.user._id
        const jobs = await Job.find({createdBy : userId}).populate({path:'company', createdAt:-1});

        if(!jobs){
            res.status(200).json({success : false , jobs})
        }

        return res.status(200).json({ success : true, jobs});
    } catch (error) {
        console.log("Error in getJobByLoggedAdminUser controller", error.message);
        return res.status(500).json({ success : false, message: "Internal server error" });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({path : "applications"}).populate({path : "company"})

        if(!job){
            return res.status(400).json({success : false , message : "Job not Found"})
        }

        res.status(200).json({success : true , job})

    } catch (error) {
        console.log("Error in getJobById controller", error.message);
        return res.status(500).json({ success : false, message: "Internal server error" });
    }
}