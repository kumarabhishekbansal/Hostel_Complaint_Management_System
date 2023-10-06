const caretakerrouter=require("express").Router();
const{login} =require("../controllers/complaints");
caretakerrouter.post("/login",login);

module.exports={caretakerrouter};