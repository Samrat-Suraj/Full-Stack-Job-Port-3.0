import mongoose from "mongoose";
import { EnvVars } from "./EnvVars.js";


export const MongoDb = async () =>{
    try {
        const conn = await mongoose.connect(EnvVars.MONGO_URI)
        console.log(`MongoDb connected: ${conn.connection.host}`)        
    } catch (error) {
        console.log("Error In Connecting To MongoDB" , error.message)
        process.exit(1)
    }
}