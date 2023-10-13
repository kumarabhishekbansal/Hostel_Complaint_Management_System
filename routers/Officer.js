const officerrouter = require("express").Router();
const {
  login,
  add_warden,
  add_care_taker,
  getProfile,
  update_officer_data,
  update_officer_profile_pic,
  get_all_wardens,
  get_all_caretakers,
} = require("../controllers/Officer");
const {  officerGuard } = require("../middlewares/authmiddleware");
officerrouter.post("/login", login);
officerrouter.post("/add-warden",  officerGuard, add_warden);
officerrouter.post("/add-careTaker",  officerGuard, add_care_taker);
officerrouter.get("/getprofile", officerGuard, getProfile);
officerrouter.get("/getallwardens",  officerGuard, get_all_wardens);
officerrouter.put(
  "/updateprofile",
  officerGuard,
  update_officer_data
);
// officerrouter.put(
//   "/updateprofilepic",
//   officerGuard,
//   update_officer_profile_pic
// );

officerrouter.get(
  "/getallcaretakers",
  officerGuard,
  get_all_caretakers
);

module.exports = { officerrouter };
