const Complaint = require("../models/Complaint");

// I will get the complaint id by which I can update the assigned task
const update_assign_task_care_taker = async (data) => {
  try {
    const { complaint_id, assignedTo } = data;
    if (!complaint_id || !assignedTo) {
      // throw new Error("can not assign care taker to this task");
      return res.status(400).josn({
        message:"can not assign care taker to this task"
      })
    }
    const add_task_to_caretaker = await Complaint.findByIdAndUpdate(
      complaint_id,
      {
        assignedTo: assignedTo,
      }
    );

    await add_task_to_caretaker.save();
    return true;
  } catch (error) {
    console.log("Error while add_assign_task_care_taker");
    return false;
  }
};

// now we update the status of complaint by care_taker

const update_status_by_care_taker = async (data) => {
  try {
    const { complaint_id, status } = data;
    const update_status = await Complaint.findByIdAndUpdate(complaint_id, {
      status: status,
    });
    await update_status.save();
    return true;
  } catch (error) {
    console.log("error while update_status_by_care_taker complaint");
    return false;
  }
};

// get all complaints for officer

const get_all_complaints_for_officer = async (req, res, next) => {
  try {
    const data = await Complaint.find().sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_for_officer");
  }
};

// filterations

// get all complaints with specific tasks status

const get_all_complaints_with_status = async (req, res, next) => {
  try {
    const { status } = req.params;
    // console.log("status : ",status);
    const data = await Complaint.find({ status: status }).sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_with_status");
  }
};

// get all complaints with tags

const get_all_complaints_with_tags = async (req, res, next) => {
  try {
    const { tags } = req.params;
    console.log("tags ",tags);
    const data = await Complaint.find({ tags: tags }).sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_with_tags");
  }
};

// get all complaints with tags

const get_all_complaints_with_tags_and_status = async (req, res, next) => {
  try {
    const { status, tags } = req.params;
    console.log("enter status and tags ",status, tags);
    const data = await Complaint.find({ tags: tags, status: status }).sort({
      createdDate: 1,
    });
    // console.log(data);
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_with_tags_and_status");
  }
};

// get complaint but that complaint which is related to that specific care taker

const get_all_complaints_with_caretaker = async (req, res, next) => {
  try {
    const { assignedTo } = req.params;
    const data = await Complaint.find({ assignedTo: assignedTo }).sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_with_caretaker");
  }
};

// get complaint but that complaint which is related to that specific care taker
// with status

const get_all_complaints_with_caretaker_and_status = async (req, res, next) => {
  try {
    const { assignedTo, status } = req.params;
    const data = await Complaint.find({
      assignedTo: assignedTo,
      status: status,
    }).sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints_with_caretaker_and_status");
  }
};

// get complaint but that complaint which is related to that specific care taker
// with status and also with tags

const get_all_complaints_with_caretaker_and_status_and_tags = async (
  req,
  res,
  next
) => {
  try {
    const { assignedTo, status, tags } = req.params;
    const data = await Complaint.find({
      assignedTo: assignedTo,
      status: status,
      tags: tags,
    }).sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log(
      "error while get_all_complaints_with_caretaker_and_status_and_tags"
    );
  }
};

// issue created by student

const create_issue_by_student = async (data) => {
  try {
    const { student_id, issue, tags } = data;
    if (!student_id || !issue || !tags) {
      throw new Error("can not create issue");
    }
    const createissue = await Complaint.create({
      student: student_id,
      issue: issue,
      tags: tags,
    });
    await createissue.save();
    return true;
  } catch (error) {
    console.log("error while create_issue_by_student");
    return false;
  }
};

// show all complaints to that of student who logged in

const get_all_complaints_with_student = async (data) => {
  try {
    const { student } = data;
    // console.log("student",student);
    const getdata = await Complaint.find({ student: student }).sort({
      createdDate: 1,
    }).populate([
      {
        path:"student",
        select:["name","roomNo"]
      },{
        path:"assignedTo",
        select:["name","phoneNo"]
      }
    ])
    return getdata;
  } catch (error) {
    console.log("error while get_all_complaints_with_student");
    // console.log(error.message);
  }
};

// get all complaints for wardens and caretakers
// we can achieve this through following structure
// warden/caretaker ----> gethostelcomplaint(warden_id/caretaker_id) ---> check this id.hostelassign matches with student.id.hostelassign

// get all complaints for warden

const get_all_complaints_for_warden = async (req, res, next) => {
  try {
    const hostel_id = req.warden.hostelAssign;
    console.log(hostel_id);
    // now we have hostel id through
    // nnow get all students complaints which are belongs to same hostel

    const data = await Complaint.find({})
      .sort({
        createdDate: 1,
      })
      .populate([
        {
          path: "student",
          select: ["hostelAssign"],
        },
      ]);
      // console.log(data);
    // var getdata = [];
    if (data.length > 0) {
      getdata = data.filter((val) => {
        // console.log("val ",val.student.hostelAssign.toString()===hostel_id.toString());
        return val.student.hostelAssign.toString() === hostel_id.toString();
      });
    }
    console.log(getdata);
    return res.status(200).json({
      data: getdata,
    });
  } catch (error) {
    console.log("error while get_all_complaints_for_warden");
  }
};

// get all complaints for warden

const get_all_complaints_for_caretaker = async (req, res, next) => {
  try {
    const hostel_id = req.caretaker.hostelAssign;
    // now we have hostel id through
    // nnow get all students complaints which are belongs to same hostel

    const data = await Complaint.find({})
      .sort({
        createdDate: 1,
      })
      .populate([
        {
          path: "student",
          select: ["hostelAssign"],
        },
      ]);
    // var getdata = [];
    if (data.length > 0) {
      getdata = data.filter((val) => {
        return val.student.hostelAssign.toString() === hostel_id.toString();
      });
    }
    return res.status(200).json({
      data: getdata,
    });
  } catch (error) {
    console.log("error while get_all_complaints_for_caretaker");
  }
};

module.exports = {
  update_assign_task_care_taker,
  update_status_by_care_taker,
  get_all_complaints_for_officer,
  get_all_complaints_with_status,
  get_all_complaints_with_tags,
  get_all_complaints_with_tags_and_status,
  get_all_complaints_with_caretaker,
  get_all_complaints_with_caretaker_and_status,
  get_all_complaints_with_caretaker_and_status_and_tags,
  create_issue_by_student,
  get_all_complaints_with_student,
  get_all_complaints_for_warden,
  get_all_complaints_for_caretaker,
};
