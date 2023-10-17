const hostelrouter=require("express").Router();
const{addHostels,getHostels} =require("../controllers/hostel");
const {officerGuard}=require("../middlewares/authmiddleware");
hostelrouter.post("/add-hostel",officerGuard,addHostels);
hostelrouter.get("/get-hostel",officerGuard,getHostels);
module.exports={hostelrouter};