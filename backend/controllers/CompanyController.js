import cloudinary from "../config/Cloudinary.js"
import Company from "../model/CompanyModel.js"
import User from "../model/UserModel.js"
import DataUri from "../utils/DataUri.js"

export const registerCompany = async (req, res) => {
    try {
        const userId = req.user._id
        const {name} = req.body

        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({ success : false , message : "User not found" })
        }

        const isCompanyExist = await Company.findOne({name})
        if(isCompanyExist){
            return res.status(400).json({ success : false , message : "Company already exist" })
        }

        const newComapny = new Company({
            name,
            userId : user._id
        })

        await newComapny.save()
        return res.status(201).json({ success : true , message : "Company registered successfully" , company : newComapny })

    } catch (error) {
        console.log("Error in registerCompany controller", error.message)
        return res.status(500).json({ success : false ,  message: "Internal Server Error" })
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.user._id
        const companies = await Company.find({userId})
        return res.status(200).json({ success : true , companies })
    } catch (error) {
        console.log("Error in getCompany controller", error.message)
        return res.status(500).json({ success : false ,  message: "Internal Server Error" })
    }
}
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(200).json({success : false , message : "No Company Found"})
        }

        return res.status(200).json({success : true , company})
    } catch (error) {
        console.log("Error in getCompanyById controller", error.message)
        return res.status(500).json({ success : false ,  message: "Internal Server Error" })
    }
}
export const updateCompanyInformation = async (req, res) => {
    try {
        const userId = req.user._id
        const companyId = req.params.id
        const {name , description , location , website } = req.body
        let logo = req.file

        const company = await Company.findById(companyId)
        if(!company){
            return res.status(200).json({success : false , message : "No Company Found"})
        }

        if(company.userId.toString() !== userId.toString()){
            return res.status(401).json({ success : false , message : "You are not authorized to update this company" })
        }

        if(logo){
            if(company.logo){
                const oldPublicId = company.logo.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(oldPublicId)
            }
            let fileuri = DataUri(logo)
            let cloudResponse = await cloudinary.uploader.upload(fileuri)
            company.logo = cloudResponse.secure_url || company.logo
        }


        company.name = name || company.name
        company.description = description || company.description
        company.location = location || company.location
        company.website = website || company.website
        await company.save()

        res.status(200).json({success : true , message : "Company information updated successfully" , company})
    } catch (error) {
        console.log("Error in updateCompanyInformation controller", error.message)
        return res.status(500).json({ success : false ,  message: "Internal Server Error" })
    }
}