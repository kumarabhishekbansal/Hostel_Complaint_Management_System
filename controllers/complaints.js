const Complaint = require("../models/Complaint");

// I will get the complaint id by which I can update the assigned task
const update_assign_task_care_taker = async (data) => {
  try {
    const { complaint_id, assignedTo } = data;
    if (!complaint_id || !assignedTo) {
      throw new Error("can not assign care taker to this task");
    }
    const add_task_to_caretaker = await Complaint.findByIdAndUpdate(
      complaint_id,
      {
        assignedTo: assignedTo,
      }
    );

    await add_task_to_caretaker.save();
  } catch (error) {
    console.log("Error while add_assign_task_care_taker");
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
  } catch (error) {
    console.log("error while update_status_by_care_taker complaint");
  }
};

// get all complaints

const get_all_complaints = async (req, res, next) => {
  try {
    const data = await Complaint.find().sort({
      createdDate: 1,
    });
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    console.log("error while get_all_complaints");
  }
};

// filterations

// get all complaints with specific tasks status

const get_all_complaints_with_status = async (req, res, next) => {
  try {
    const { status } = req.body;
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
    const { tags } = req.body;
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
    const { status, tags } = req.body;
    const data = await Complaint.find({ tags: tags, status: status }).sort({
      createdDate: 1,
    });
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
    const { assignedTo } = req.body;
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
    const { assignedTo, status } = req.body;
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
    const { assignedTo, status, tags } = req.body;
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
  } catch (error) {
    console.log("error while create_issue_by_student");
  }
};

// show all complaints to that of student who logged in

const get_all_complaints_with_student = async (data) => {
  try {
    const { student } = data;
    const data = await Complaint.find({ student: student }).sort({
      createdDate: 1,
    });
    return data;
  } catch (error) {
    console.log("error while get_all_complaints_with_student");
  }
};

module.exports = {
  update_assign_task_care_taker,
  update_status_by_care_taker,
  create_issue_by_student,
  get_all_complaints_with_student,
};
