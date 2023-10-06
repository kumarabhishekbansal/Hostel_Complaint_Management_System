const Warden = require("../models/Warden");
const { update_assign_task_care_taker } = require("./complaints");
const { register_Student_From_Warden,get_all_students_for_wardens } = require("./Student");
const {get_all_caretakers_for_warden}=require("./careTaker");
// now officer will add the warden

const add_warden_by_officer = async (data) => {
  try {
    const { name, phoneNo, email, password, hostelAssign, role } = data;
    if (!name || !phoneNo || !email || !password || !hostelAssign || !role) {
      throw new Error("Properly filled all values to add warden");
    }

    // add warden

    const addwarden = await Warden.create({
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      hostelAssign: hostelAssign,
      role: role,
    });
    await addwarden.save();
  } catch (error) {
    console.log("error while add_warden_by_officer");
  }
};

// now warden is created

// login the warden

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let warden = await Warden.findOne({ email });
    if (!warden) {
      throw new Error("EMAIL NOT FOUND");
    }
    if (await warden.comparePassword(password)) {
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
      });
    }
  } catch (error) {
    console.log("error while login in warden");
  }
};

// get all wardens to officers so that officers can assign the wardens
// to specific hostels

const get_all_warden_for_officers=async()=>{
  try {
    const getdata=await Warden.find();
    return getdata;
  } catch (error) {
    console.log("error while get_all_warden_for_officers");
  }
}

// now its turn to add students in database by warden

const add_students_by_warden = async (req, res, next) => {
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
    } = req.body;
    const data = req.body;
    await register_Student_From_Warden(data);
  } catch (error) {
    console.log("error while add_students_by_warden");
  }
};

// get warden profile

const getProfile = async (req, res, next) => {
  try {
    const data = await Warden.findById(req.warden._id).populate([
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
    });
  } catch (error) {
    console.log("error while getting warden profile");
  }
};

// update password or any other data

const update_warden_data = async (req, res, next) => {
  try {
    let warden = await Warden.findById(req.warden._id).populate([
      {
        path: "hostelAssign",
        select: ["hostel_name"],
      },
    ]);
    if (!warden) {
      throw new Error("No warden found for update");
    }
    warden.name = req.body.name || warden.name;
    warden.phoneNo = req.body.phoneNo || warden.phoneNo;
    warden.email = req.body.email || warden.email;
    warden.password = req.body.password || warden.password;
    warden.confirmpassword = req.body.confirmpassword || warden.confirmpassword;
    warden.profilePic = req.body.profilePic || warden.profilePic;
    warden.address = req.body.address || warden.address;

    if (warden.password !== warden.confirmpassword) {
      throw new Error("Password and confirm password do not match");
    } else if (!validator.isEmail(warden.email)) {
      throw new Error("Email not validate");
    } else if (!validator.isStrongPassword(warden.password)) {
      throw new Error("Password is not strong");
    }

    const updatedwarden = await warden.save();
    return res.status(200).json({
      name: updatedwarden.name,
      phoneNo: updatedwarden.phoneNo,
      email: updatedwarden.email,
      profilePic: updatedwarden.profilePic,
      address: updatedwarden.address,
      role: updatedwarden.role,
      hostel_name: updatedwarden.hostelAssign.hostel_name,
    });
  } catch (error) {
    console.log("error while update_warden_data");
  }
};

// assign the care taker to complaints and we must have to pass complaint id
// so that we can know which complaint id we have to update

const assign_care_taker_to_complaint = async (req, res, next) => {
  try {
    const data = req.body;
    await update_assign_task_care_taker(data);
  } catch (error) {
    console.log("error while assign_care_taker_to_complaint");
  }
};

// show all care takers of same hostel whose warden resides

const get_care_takers=async(req,res,next)=>{
  try {
    const {hostel_id}=req.body;
    const data={hostel_id:hostel_id};
    const getdata=await get_all_caretakers_for_warden(data);
    return res.status(200).json({
      data:getdata
    });
  } catch (error) {
    console.log("error while get_care_takers warden");
  }
}


// show all students to get list of all students whose hostel same as warden

const get_students=async(req,res,next)=>{
  try {
    const {hostel_id}=req.body;
    const data={hostel_id:hostel_id};
    const getdata=await get_all_students_for_wardens(data);
    return res.status(200).json({
      data:getdata
    })
  } catch (error) {
    console.log("error while get_students ");
  }
}


module.exports = {
  add_warden_by_officer,
  add_students_by_warden,
  getProfile,
  update_warden_data,
  assign_care_taker_to_complaint,
  get_all_warden_for_officers
};
