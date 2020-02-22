const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mehmet_kaskaya:cNMUszZSvb7IKiEh@mern-youtube-fekti.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true}).
    then(()=>console.log("DB connected")).
    catch(err=>console.error(err))

app.get('/',(req,res)=>{
    res.send('hello word')
})

app.listen(5000);