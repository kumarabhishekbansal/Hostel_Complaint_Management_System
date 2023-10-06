const studentrouter=require("express").Router();
const{login} =require("../controllers/Student");
studentrouter.post("/login",login);

module.exports={studentrouter};