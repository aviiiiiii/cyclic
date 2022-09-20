const express = require('express');
const cors =require('cors');
const mongoose = require("mongoose");
const dotenv=require("dotenv");

const app =express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

dotenv.config();

const mongoURI=process.env.CONNECTION_URL;
const PORT =process.env.PORT || 5000;
mongoose.connect(mongoURI,{useNewUrlParser:true, useUnifiedTopology:true});

app.get("/",(req,res)=>{
    res.send("Working")
})

const vehicleListSchema=new mongoose.Schema(
    {
        type : String,
        number : String,
        date : String,
        toll : String,
        tariff : String,
        dateFormated:String
    }
);

const VehicleList =mongoose.model("VehicleList",vehicleListSchema);

const sample={
    "type": "vehicleType",
    "number": "vehicleNumber",
    "date": "dateTime",
    "toll": "tollName", 
    "tariff": "tariff",
    "dateFormated":"dateFormated"}

        VehicleList.insertMany(sample,(err)=>{
            if(err) console.log(err);
            else    console.log("Inserted");
        })

app.listen(PORT, ()=>{console.log("Server started ")});
