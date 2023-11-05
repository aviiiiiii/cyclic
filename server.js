const express = require('express');
const cors =require('cors');
const mongoose = require("mongoose");
const dotenv=require("dotenv");
const e = require('express');

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
        dateFormated:Number
    }
);

const VehicleList =mongoose.model("VehicleList",vehicleListSchema);

const tollListSchema=new mongoose.Schema(
    {
        name:String,
        carSingle:Number,   
        carReturn:Number,
        lcvSingle:Number,
        lcvReturn:Number,
        truckSingle:Number,
        truckReturn:Number,
        heavySingle:Number,
        heavyReturn:Number
    }
);

const TollList =mongoose.model("TollList",tollListSchema);



// const sample={
//     "type": "vehicleType",
//     "number": "vehicleNumber",
//     "date": "dateTime",
//     "toll": "tollName", 
//     "tariff": "tariff",
//     "dateFormated":"dateFormated"}

//         VehicleList.insertMany(sample,(err)=>{
//             if(err) console.log(err);
//             else    console.log("Inserted");
//         })


app.get("/getVehicleList",(req,res)=>{
    VehicleList.find({}, null, {sort: {dateFormated: -1}},(err,vehicles)=>{
        res.send(vehicles);
    })
})

app.get("/getVehicleListWithfilter/:value",(req,res)=>{
    let filterValue=req.params.value;
    VehicleList.find({number:{$regex: filterValue, $options:'i'}},null, {sort: {dateFormated: -1}},(err,vehicles)=>{
        res.send(vehicles);
    })
})


app.get("/getVehicleListWithfilter2/:value",(req,res)=>{
    let filterValue=req.params.value;
    VehicleList.find({toll:{$regex:filterValue}},null, {sort: {dateFormated: -1}},(err,vehicles)=>{
        res.send(vehicles);
    })
})

app.get("/getTollListWithfilter/:value",(req,res)=>{
    let filterValue=req.params.value;
    TollList.find({name:{$regex:filterValue, $options:'i'}},null, {sort: {name: 1}},(err,tolls)=>{
        res.send(tolls);
    })
})

app.post("/postVehicle",(req,res)=>{
    VehicleList.insertMany([req.body],(err)=>{
        if(err) console.log(err);
        else    console.log("inserted");
    })
})

app.get("/getTollList",(req,res)=>{
    TollList.find({},null,{sort: {name: 1}}, (err,tolls)=>{
        res.send(tolls);
    })
})

app.post("/postToll",(req,res)=>{
    TollList.insertMany([req.body],(err)=>{
        if(err) console.log(err);
        else    console.log("inserted");
    })
})

app.delete("/deleteToll/:delVal", (req,res)=>{
    const tollName=req.params.delVal;

    TollList.findOneAndDelete({name:tollName},(err)=>{
        if(err) console.log(err)
        else    console.log("Toll Deleted")
    })
})

app.listen(PORT, ()=>{console.log("Server started ")});
