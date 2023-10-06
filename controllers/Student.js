const Student = require("../models/Student");
const {update_room_by_hostel_roomno}=require("./rooms");
const {create_issue_by_student,get_all_complaints_with_student}=require("./complaints");

// warden can add students


const register_Student_From_Warden = async (data) => {
  try {
    const {
      name,
      phoneNo,
      email,
      password,
      hostelAssign,
      roomNo,
      department,
      floorNo,
      role,
    } = data;
    if (
      !name ||
      !phoneNo ||
      !email ||
      !password ||
      !hostelAssign ||
      !roomNo ||
      !department ||
      !floorNo ||
      !role
    ) {
      throw new Error("Add all fields to adding student");
    }
    const registerStudent = await Student.create({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      hostelAssign: hostelAssign,
      roomNo: roomNo,
      department: department,
      floorNo: floorNo,
      role: role,
    });
    await registerStudent.save();

    // now we have to update hostel model
      // when ever a new student is added by warden 
      // we have to get hostel id through which we can update
      // the students in hostel model and update the capacity of that room
      // with specific hostel id and room no.
    

      const data={
        hostel_id:hostelAssign,
        roomno:roomNo,
        floor:floorNo
      }
      update_room_by_hostel_roomno(data);

  } catch (error) {
    console.log("error while registering student");
  }
};



// login 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let student = await Student.findOne({ email });
    if (!student) {
      throw new Error("EMAIL NOT FOUND");
    }
    if (await student.comparePassword(password)) {
      const data = await Warden.findById(warden._id).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);
      return res.status(200).json({
        name: data[0].name,
        phoneNo: data[0].phoneNo,
        email: data[0].email,
        profilePic: data[0].profilePic,
        address: data[0].address,
        role: data[0].role,
        hostelAssign: data[0].hostelAssign,
        hostel_name: data[0].hostelAssign.hostel_name,
        roomNo:data[0].roomNo,
        department:data[0].department,
        floorNo:data[0].floorNo,
      });
    }
  } catch (error) {
    console.log("error while login in student");
  }
};

// get student profile

const getProfile = async (req, res, next) => {
  try {
    const data = await Student.findById(req.student._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    if (data.length == 0) {
      throw new Error("Nothing to show");
    }
    return res.status(200).json({
      name: data[0].name,
      phoneNo: data[0].phoneNo,
      email: data[0].email,
      profilePic: data[0].profilePic,
      address: data[0].address,
      role: data[0].role,
      hostelAssign: data[0].hostelAssign,
      hostel_name: data[0].hostelAssign.hostel_name,
      roomNo:data[0].roomNo,
      department:data[0].department,
      floorNo:data[0].floorNo,
    });
  } catch (error) {
    console.log("error while getting student profile");
  }
};

// update password or any other data

const update_student_data = async (req, res, next) => {
  try {
    let student = await Student.findById(req.student._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    if (!student) {
      throw new Error("No student found for update");
    }
    student.name = req.body.name || student.name;
    student.phoneNo = req.body.phoneNo || student.phoneNo;
    student.email = req.body.email || student.email;
    student.password = req.body.password || student.password;
    student.confirmpassword = req.body.confirmpassword || student.confirmpassword;
    student.profilePic = req.body.profilePic || student.profilePic;
    student.address = req.body.address || student.address;
    student.department=req.body.department || student.department;

    if (student.password !== student.confirmpassword) {
      throw new Error("Password and confirm password do not match");
    } else if (!validator.isEmail(student.email)) {
      throw new Error("Email not validate");
    } else if (!validator.isStrongPassword(student.password)) {
      throw new Error("Password is not strong");
    }

    const updatedstudent = await student.save();
    return res.status(200).json({
      name: updatedstudent.name,
      phoneNo: updatedstudent.phoneNo,
      email: updatedstudent.email,
      profilePic: updatedstudent.profilePic,
      address: updatedstudent.address,
      role: updatedstudent.role,
      hostel_name: updatedstudent.hostelAssign.hostel_name,
      roomNo:updatedstudent.roomNo,
      department:updatedstudent.department,
      floorNo:updatedstudent.floorNo,
    });
  } catch (error) {
    console.log("error while update_warden_data");
  }
};


// get all students for warden of same hostel as warden

const get_all_students_for_wardens=async(data)=>{
  try {
    const {hostel_id}=data;
    const getdata=await Student.find({hostelAssign:hostel_id});
    return getdata;
  } catch (error) {
    console.log("error while get_all_students_for_wardens");
  }
}


// issue can be created by students

const create_issue=async(req,res,next)=>{
  try {
    const {student_id,issue,tags}=req.body;
    const data={student_id:student_id,issue:issue,tags:tags};
    await create_issue_by_student(data);
  } catch (error) {
    console.log("error while create_issue student side");
  }
}


// get all complaints who logged in

const get_complaints=async(req,res,next)=>{
  try {
    const data={student:req.student._id};
    const getdata=await get_all_complaints_with_student(data);
    return res.status(200).json({
      data:getdata
    });
  } catch (error) {
    console.log("error while get_complaints");
  }
}

module.exports={register_Student_From_Warden,loginStudent,get_all_students_for_wardens}