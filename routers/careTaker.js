const caretakerrouter=require("express").Router();
const{login} =require("../controllers/careTaker");
caretakerrouter.post("/login",login);

module.exports={caretakerrouter};