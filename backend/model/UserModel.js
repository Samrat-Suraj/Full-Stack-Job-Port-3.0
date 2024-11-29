import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {type: String},
    email : {type: String, required: true , unique: true},
    password : {type: String, required: true},
    phoneNumber : {type: Number, required: true},
    role : {type: String, enum :["admin" , "student"], required : true},

    profile : {
        bio : { type : String , default : ""},
        profilePic : {type: String , default : ""},
        city : {type: String , default : ""},
        address : {type: String , default : ""},
        dob : {type: String , default : ""},
        resume : {type: String , default : ""},
        resumeOriginalName : {type: String , default : ""},
        skills : {type: [String] , default : []},
        company : {type : mongoose.Schema.Types.ObjectId , ref : "Company"}
    }
},{timestamps : true})

const User = mongoose.model("User" , userSchema)
export default User