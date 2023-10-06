const wardenrouter=require("express").Router();
const{login,add_students_by_warden} =require("../controllers/Warden");
wardenrouter.post("/login",login);
wardenrouter.post("/add-students",add_students_by_warden);

module.exports={wardenrouter};