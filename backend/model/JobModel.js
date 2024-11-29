import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    requirements : [{ type: String}],
    location : { type: String, required: true },
    salary : { type: String, required: true },
    jobType  :{ type: String, required: true },
    experienceLevel : { type: String, required: true },
    position : { type: Number, required: true },
    
    company : { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
    applications : [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
    createdBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
},{timestamps : true})

const Job = mongoose.model("Job" , jobSchema)
export default Job
