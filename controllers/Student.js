const Student = require("../models/Student");
const validator=require("validator");
const { update_room_by_hostel_roomno } = require("./rooms");
const {
  create_issue_by_student,
  get_all_complaints_with_student,
} = require("./complaints");

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

    const datas = {
      hostel_id: hostelAssign,
      roomno: roomNo,
      floor: floorNo,
    };
    update_room_by_hostel_roomno(datas);
    return true;
  } catch (error) {
    console.log("error while registering student");
    console.log(error.message);
    return false;
  }
};

// login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let student = await Student.findOne({ email });
    if (!student) {
      // throw new Error("EMAIL NOT FOUND");
      return res.status(400).json({
        message: "Email not found",
      });
    }
    if (await student.comparePassword(password)) {
      const data = await Student.findById(student._id).populate([
        {
          path: "hostelAssign",
          select: ["hostel_name"],
        },
      ]);
      const token = await data.generateJWT();
      if (req.cookies["Bearer_student"]) {
        req.cookies["Bearer_student"] = "";
      }
      res.cookie("Bearer_student", token, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
        httpOnly: true,
        sameSite: "lax",
      });
      return res.status(200).json({
        name: data.name,
        phoneNo: data.phoneNo,
        email: data.email,
        profilePic: data.profilePic,
        address: data.address,
        role: data.role,
        hostelAssign: data.hostelAssign,
        hostel_name: data.hostelAssign.hostel_name,
        roomNo: data.roomNo,
        department: data.department,
        floorNo: data.floorNo,
        token: token,
      });
    }
    return res.status(400).json({
      message: "wrong credentials",
    });
  } catch (error) {
    console.log("error while login in student");
    console.log(error.message);
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
    // if (data.length == 0) {
    //   throw new Error("Nothing to show");
    // }
    return res.status(200).json({
      name: data.name,
      phoneNo: data.phoneNo,
      email: data.email,
      profilePic: data.profilePic,
      address: data.address,
      role: data.role,
      hostelAssign: data.hostelAssign,
      hostel_name: data.hostelAssign.hostel_name,
      roomNo: data.roomNo,
      department: data.department,
      floorNo: data.floorNo,
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
    student.confirmpassword =
      req.body.confirmpassword || student.confirmpassword;
    // student.profilePic = req.body.profilePic || student.profilePic;
    student.address = req.body.address || student.address;
    student.department = req.body.department || student.department;

    if(req.body.password && !req.body.confirmpassword)
    {
      return res.status(400).json({
        message:"Enter confirm password also"
      })
    }
    if(!req.body.password && req.body.confirmpassword)
    {
      return res.status(400).json({
        message:"Enter  password also"
      })
    }
    if ((req.body.password && req.body.confirmpassword) && student.password !== student.confirmpassword) {
      // throw new Error("Password and confirm password do not match");
      return res.status(400).json({
        message:"Password and confirm password do not match"
      })
    }
    if ((req.body.email) && !validator.isEmail(student.email)) {
      // throw new Error("Email not validate");
      return res.status(400).json({
        message:"Email not validate"
      })
      
    }
    if((req.body.password && req.body.confirmpassword) && !validator.isStrongPassword(student.password)) {
      // throw new Error("Password is not strong");
      return res.status(400).json({
        message:"Password is not strong"
      })
    }


    const updatedstudent = await student.save();
    const token = await updatedstudent.generateJWT();
    if (req.cookies["Bearer_student"]) {
      req.cookies["Bearer_student"] = "";
    }
    res.cookie("Bearer_student", token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });
    return res.status(200).json({
      name: updatedstudent.name,
      phoneNo: updatedstudent.phoneNo,
      email: updatedstudent.email,
      profilePic: updatedstudent.profilePic,
      address: updatedstudent.address,
      role: updatedstudent.role,
      hostel_name: updatedstudent.hostelAssign.hostel_name,
      roomNo: updatedstudent.roomNo,
      department: updatedstudent.department,
      floorNo: updatedstudent.floorNo,
      token: token,
    });
  } catch (error) {
    console.log("error while update_student_data");
  }
};

// update student profile photo

const update_student_profile_pic = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          let updatedstudent = await User.findById(req.student._id);
          filename = updatedstudent.avatar;
          // if we have already file exits then first we have to remove it then add new file
          if (filename) {
            fileRemover(filename);
          }
          updatedstudent.avatar = req.file.filename;
          await updatedstudent.save();
          const token = await updatedstudent.generateJWT();
          if (req.cookies["Bearer_student"]) {
            req.cookies["Bearer_student"] = "";
          }
          res.cookie("Bearer_student", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedstudent.name,
            phoneNo: updatedstudent.phoneNo,
            email: updatedstudent.email,
            profilePic: updatedstudent.profilePic,
            address: updatedstudent.address,
            role: updatedstudent.role,
            hostel_name: updatedstudent.hostelAssign.hostel_name,
            roomNo: updatedstudent.roomNo,
            department: updatedstudent.department,
            floorNo: updatedstudent.floorNo,
            token: token,
          });
        } else {
          // we have to delete image when nothing upload
          let filename;
          let updatedstudent = await User.findById(req.student._id);
          filename = updatedstudent.avatar;
          updatedstudent.avatar = "";
          await updatedstudent.save();
          fileRemover(filename);
          const token = await updatedstudent.generateJWT();
          if (req.cookies["Bearer_student"]) {
            req.cookies["Bearer_student"] = "";
          }
          res.cookie("Bearer_student", token, {
            path: "/",
            expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 30 seconds
            httpOnly: true,
            sameSite: "lax",
          });
          return res.status(200).json({
            name: updatedstudent.name,
            phoneNo: updatedstudent.phoneNo,
            email: updatedstudent.email,
            profilePic: updatedstudent.profilePic,
            address: updatedstudent.address,
            role: updatedstudent.role,
            hostel_name: updatedstudent.hostelAssign.hostel_name,
            roomNo: updatedstudent.roomNo,
            department: updatedstudent.department,
            floorNo: updatedstudent.floorNo,
            token: token,
          });
        }
      }
    });
  } catch (error) {
    console.log("error while update_student_profile_pic");
    next(error);
  }
};

// get all students for warden of same hostel as warden

const get_all_students_for_wardens = async (data) => {
  try {
    const { hostel_id } = data;
    const getdata = await Student.find({ hostelAssign: hostel_id }).populate([
      {
        path:"hostelAssign",
        select:["hostel_name"]
      }
    ])
    return getdata;
  } catch (error) {
    console.log("error while get_all_students_for_wardens");
    // console.log(error.message);
  }
};

// issue can be created by students

const create_issue = async (req, res, next) => {
  try {
    const { issue, tags } = req.body;
    const student_id = req.student._id;
    const data = { student_id: student_id, issue: issue, tags: tags };
    if ((await create_issue_by_student(data)) === true) {
      return res.send("Issue created");
    }
    return res.send("something went wrong");
  } catch (error) {
    console.log("error while create_issue student side");
  }
};

// get all complaints who logged in

const get_complaints = async (req, res, next) => {
  try {
    const data = { student: req.student._id };
    const getdata = await get_all_complaints_with_student(data);
    return res.status(200).json({
      data: getdata,
    });
  } catch (error) {
    console.log("error while get_complaints");
  }
};

module.exports = {
  register_Student_From_Warden,
  login,
  getProfile,
  update_student_data,
  update_student_profile_pic,
  get_all_students_for_wardens,
  create_issue,
  get_complaints,
};
