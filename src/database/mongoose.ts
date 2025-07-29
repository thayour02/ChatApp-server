import dotenv from "dotenv";

dotenv.config()

import mongoose from "mongoose";
console.log(process.env.DB_URI)

const connect = async()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connect;