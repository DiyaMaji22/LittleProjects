const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const cors=require('cors');
const port=3019;  


const app=express();

// Enable CORS for all routes
app.use(cors());

// Serve static files
app.use(express.static(__dirname))

// Parse form data and JSON
app.use(express.urlencoded({extended:true}))
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/formdata')
const db=mongoose.connection;
db.once('open',()=>
{
  console.log("MongoDB connected successfully");
})
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const userschema=new mongoose.Schema({
  name:String,
  email:String,
  password:String,
})

const users=mongoose.model("data",userschema);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));

})
app.post('/post',async(req,res)=>
{
  try {
    console.log('Received POST request');
    console.log('Request headers:', req.headers);
    console.log('Received form data:', req.body); // Debug log
    
    const {name,email,password}=req.body
    
    
    if (!name || !email || !password) {
      console.log('Validation failed - missing fields');
      return res.status(400).send('All fields are required');
    }
    
   
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).send('User with this email already exists');
    }
    
    const user=new users({
      name,
      email,
      password
    })
    
    await user.save();
    console.log('User saved successfully:', user);
    res.send("Done Signing up! User data saved to database.");
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Error saving user data: ' + error.message);
  }
});


  app.listen(port,()=>
  {
    console.log("Server started");
  })
