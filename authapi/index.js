import "dotenv/config.js"
import express from "express";
import db from "./db/db.js";
import userRoute from "./route/userroute.js"


const app=express();
const PORT=process.env.PORT || 3000;
app.use(express.json());

app.get("/",()=>{

})



app.use(express.json());

app.use("/api/user",userRoute);



db().then(()=>
{
    app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
});

