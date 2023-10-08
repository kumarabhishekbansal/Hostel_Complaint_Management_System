const studentrouter = require("express").Router();
const {
  login,
  getProfile,
  update_student_data,
  update_student_profile_pic,
  create_issue,
  get_complaints
} = require("../controllers/Student");
const { studentGuard } = require("../middlewares/authmiddleware");

studentrouter.post("/login", login);
studentrouter.get("/getprofile", studentGuard, getProfile);
studentrouter.put(
  "/updateprofile",
  studentGuard,
  update_student_data
);
studentrouter.put(
  "/updateprofilepic",
  studentGuard,
  update_student_profile_pic
);

studentrouter.post("/createissue", studentGuard, create_issue);

studentrouter.get("/getcomplaints", studentGuard,get_complaints);

module.exports = { studentrouter };
