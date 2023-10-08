const wardenrouter = require("express").Router();
const {
  login,
  add_students_by_warden,
  getProfile,
  update_warden_data,
  update_warden_profile_pic,
  get_care_takers,
  get_students
} = require("../controllers/Warden");
const {wardenGuard } = require("../middlewares/authmiddleware");
wardenrouter.post("/login", login);
wardenrouter.post(
  "/add-students",
  wardenGuard,
  add_students_by_warden
);
wardenrouter.get("/getprofile",  wardenGuard, getProfile);
wardenrouter.put("/updateprofile",wardenGuard,update_warden_data);
wardenrouter.put("/updateprofilepic",wardenGuard,update_warden_profile_pic);
wardenrouter.get("/getcaretakers",wardenGuard,get_care_takers);
wardenrouter.get("/getstudents",wardenGuard,get_students);
module.exports = { wardenrouter };
