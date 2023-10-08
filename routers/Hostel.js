const hostelrouter=require("express").Router();
const{addHostels} =require("../controllers/hostel");
const {officerGuard}=require("../middlewares/authmiddleware");
hostelrouter.post("/add-hostel",officerGuard,addHostels);
module.exports={hostelrouter};