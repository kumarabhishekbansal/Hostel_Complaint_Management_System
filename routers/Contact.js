const msgroute = require("express").Router();
const {
    addmessage
} = require("../controllers/Contact");

msgroute.post("/addmessage",addmessage);

module.exports = { msgroute };
