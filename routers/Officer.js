const officerrouter=require("express").Router();
const{login,add_warden,add_care_taker,getProfile,update_officer_data} =require("../controllers/Officer");

officerrouter.post("/login",login);
officerrouter.post("/add-warden",add_warden);
officerrouter.post("/add-careTaker",add_care_taker);
officerrouter.get("/getprofile",getProfile);
officerrouter.put("/updateprofile",update_officer_data);

module.exports={officerrouter};