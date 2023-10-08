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

complaintrouter.get("/getcomplaints/:status", get_all_complaints_with_status);
complaintrouter.get("/getcomplaints/:tags", get_all_complaints_with_tags);
complaintrouter.get(
  "/getcomplaints/:status/:tags",
  get_all_complaints_with_tags_and_status
);
complaintrouter.get(
  "/getcomplaints/:assignedTo",
  caretakerGuard,
  get_all_complaints_with_caretaker
);
complaintrouter.get(
  "/getcomplaints/:assignedTo/:status",
  caretakerGuard,
  get_all_complaints_with_caretaker_and_status
);
complaintrouter.get(
  "/getcomplaints/:assignedTo/:status/:tags",
  caretakerGuard,
  get_all_complaints_with_caretaker_and_status_and_tags
);
complaintrouter.get(
  "/getcomplaints",
  wardenGuard,
  get_all_complaints_for_warden
);
complaintrouter.get(
  "/getcomplaints",
  caretakerGuard,
  get_all_complaints_for_caretaker
);
module.exports = { complaintrouter };
