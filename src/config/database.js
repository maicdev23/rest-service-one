import mongoose from "mongoose";

export const dbc = async () => {
    try{
        await mongoose.set("strictQuery", false).connect(process.env.MONGO_URI)
        console.log("Database connection established")
    }catch(err){
        console.error(err);
    }
}