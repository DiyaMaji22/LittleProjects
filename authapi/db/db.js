import mongoose from "mongoose";

const db=async()=>{

    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is connected");


    }catch(error){
        console.log("db error",error);

    }

};
export default db;