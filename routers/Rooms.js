const roomrouter=require("express").Router();
const {get_rooms_by_hostel_id}=require("../controllers/rooms");
roomrouter.post("/getrooms",get_rooms_by_hostel_id);
module.exports={roomrouter};