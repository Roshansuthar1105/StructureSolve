const express=require('express')
const app=express();
app.get('/',(req,res)=>{
    res.status(200).json({"Result":"Responce from backend server"});
})
app.listen(5000,()=>{
    console.log("app is running at 5000");
})