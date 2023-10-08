const caretakerrouter = require("express").Router();
const {
  login,
  getProfile,
  update_caretaker_data,
  update_caretaker_profile_pic,
  update_status_complaint,
} = require("../controllers/careTaker");
const {  caretakerGuard } = require("../middlewares/authmiddleware");
caretakerrouter.post("/login", login);
caretakerrouter.get("/getprofile", caretakerGuard, getProfile);
caretakerrouter.put(
  "/updateprofile",
  caretakerGuard,
  update_caretaker_data
);
caretakerrouter.put(
  "/updateprofilepic",
  caretakerGuard,
  update_caretaker_profile_pic
);
caretakerrouter.put(
  "/updatecomplaint",
  caretakerGuard,
  update_status_complaint
);
module.exports = { caretakerrouter };
