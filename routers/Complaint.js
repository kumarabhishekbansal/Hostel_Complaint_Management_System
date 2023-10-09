const complaintrouter = require("express").Router();
const {
  get_all_complaints_for_officer,
  get_all_complaints_with_status,
  get_all_complaints_with_tags,
  get_all_complaints_with_tags_and_status,
  get_all_complaints_with_caretaker,
  get_all_complaints_with_caretaker_and_status,
  get_all_complaints_with_caretaker_and_status_and_tags,
  get_all_complaints_for_warden,
  get_all_complaints_for_caretaker,
} = require("../controllers/complaints");
const {
  officerGuard,
  caretakerGuard,
  wardenGuard,
  studentGuard,
} = require("../middlewares/authmiddleware");
complaintrouter.get(
  "/getcomplaintsofficer",
  officerGuard,
  get_all_complaints_for_officer
);

complaintrouter.get("/getcomplaints_status/:status", get_all_complaints_with_status);
complaintrouter.get("/getcomplaints_tags/:tags", get_all_complaints_with_tags);
complaintrouter.get(
  "/getcomplaints/:status/:tags",
  get_all_complaints_with_tags_and_status
);
complaintrouter.get(
  "/getcomplaints_assign/:assignedTo",
  caretakerGuard,
  get_all_complaints_with_caretaker
);
complaintrouter.get(
  "/getcomplaints_assign_staus/:assignedTo/:status",
  caretakerGuard,
  get_all_complaints_with_caretaker_and_status
);
complaintrouter.get(
  "/getcomplaints_assign_status_tags/:assignedTo/:status/:tags",
  caretakerGuard,
  get_all_complaints_with_caretaker_and_status_and_tags
);
complaintrouter.get(
  "/getcomplaintswarden",
  wardenGuard,
  get_all_complaints_for_warden
);
complaintrouter.get(
  "/getcomplaintscaretaker",
  caretakerGuard,
  get_all_complaints_for_caretaker
);
module.exports = { complaintrouter };
