import express from "express"
const app = express()

import cookieParser from "cookie-parser"
import cors from "cors"

import { MongoDb } from "./config/MongoDb.js"
import { EnvVars } from "./config/EnvVars.js"

import UserRouter from "./routers/UserRouter.js"
import CompanyRouter from "./routers/CompanyRouter.js"
import JobRouter from "./routers/JobRouter.js"
import ApplicationRouter from "./routers/ApplicationRouter.js"


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

import path from 'path';
const _dirname = path.resolve();

app.use("/api/user" , UserRouter)
app.use("/api/company" , CompanyRouter)
app.use("/api/job" , JobRouter)
app.use("/api/application" , ApplicationRouter)



app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

const PORT = 5000 || EnvVars.PORT
app.listen(PORT , ()=>{
    MongoDb()
    console.log(`Server is running on port ${PORT}`)    
})