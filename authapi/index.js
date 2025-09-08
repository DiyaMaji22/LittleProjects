import "dotenv/config.js"
import express from "express";
import db from "./db/db.js";



const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());

// Connect to database
db();

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})