const roomrouter=require("express").Router();
const {get_rooms_by_hostel_id}=require("../controllers/rooms");
const {wardenGuard}=require("../middlewares/authmiddleware");
roomrouter.get("/getrooms",wardenGuard,get_rooms_by_hostel_id);


module.exports={roomrouter};