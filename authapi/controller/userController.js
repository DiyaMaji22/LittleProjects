import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
export const Login=(req,res)=>{
    
    try{


    }catch(error){

    }


}
export const Signup=async(req,res)=>{
    
    try{

        const{name,email,password}=req.body;
        if(!email || !name || !password)
        {
            return res.send({message:"Please fill all the required field",
            success:false,
            });
        }


        const checkexistuser=await userModel.findOne({email});

        if(checkexistuser)
        {
            return res.send({message:"user already exists"})
        }
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        console.log(hasspasword)
        const newuser=new userModel({
           name,
           email,
           password:hashpassword
        })


        await newuser.save();


        return res.send({
            message:"user signup successfully",newuser,success:true
        })

    }catch(error){

        console.log(error);
        return res.send({message:error.message,success:false});
    }


}